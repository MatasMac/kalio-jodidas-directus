import { InvalidPayloadError } from "@directus/errors";

export default ({ filter }, { services }) => {

  const { ItemsService } = services;

  filter("items.create", async (input, { collection }, { schema }) => {
    await validatePersonalCode(input, collection, schema);
    return input;
  });

  filter("items.update", async (input, { collection }, { schema }) => {
    await validatePersonalCode(input, collection, schema);
    return input;
  });


  async function validatePersonalCode(input, collection, schema) {
    if (collection === "journal" && input?.personal_code) {
      const personalCode = input.personal_code;

      // Validate checksum if no_lt_personal_code is not true // TODO: handle situation when no_lt_personal_code is updated but personal_code is not present in input
      if (!input.no_lt_personal_code && !validateChecksum(personalCode)) {
        throw new InvalidPayloadError({ reason: 'Asmens kodas neteisingo formato' });
      }

      const personalCodeExists = await checkPersonalCodeExists(personalCode, schema);
      // Validate if personal code is unique
      if (personalCodeExists.exists) {
        throw new InvalidPayloadError({ reason: `Asmens kodas rastas kitoje vaistinėje. ${personalCodeExists.pharmacy ? `Vaistinė: ${personalCodeExists.pharmacy}.` : ""} ${personalCodeExists.address ? ` Adresas: ${personalCodeExists.address}` : ""}`});
      }
    }
  }

  async function checkPersonalCodeExists(personalCode, schema) {
    const item = new ItemsService("journal", { schema });
    const result = await item.readByQuery({
      filter: {
        personal_code: personalCode,
        status: 'issued'
      },
      limit: 1,
      fields: ["personal_code", "pharmacy_unit.address", "pharmacy_unit.pharmacy.title"]
    });

    if (result.length > 0) {
      return {
        exists: true,
        address: result[0].pharmacy_unit?.address || null,
        pharmacy: result[0].pharmacy_unit?.pharmacy?.title || null
      };
    }

    return {
      exists: false,
      address: null
    };
  }


  // Function to validate the checksum of a Lithuanian personal code
  function validateChecksum(personalCode) {
    const weights1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
    const weights2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3];

    // Extract the first 10 digits as numbers
    const digits = personalCode.split("").map(Number);
    const controlDigit = digits[10];

    // First step checksum calculation
    let sum1 = digits.slice(0, 10).reduce((sum, digit, index) => sum + digit * weights1[index], 0);
    let remainder1 = sum1 % 11;

    // If the remainder is 10, calculate using the second set of weights
    if (remainder1 === 10) {
      let sum2 = digits.slice(0, 10).reduce((sum, digit, index) => sum + digit * weights2[index], 0);
      let remainder2 = sum2 % 11;

      return remainder2 === controlDigit || (remainder2 === 10 && controlDigit === 0);
    }

    // Otherwise, the first remainder should match the control digit
    return remainder1 === controlDigit;
  }

  // Validate personal code structure with regex
  function validatePersonalCodeRegex(personalCode) {
    const regex = /^[1-6]\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}\d$/;
    return regex.test(personalCode);
  }
}