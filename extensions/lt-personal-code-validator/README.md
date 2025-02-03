# README.md

# Directus Hook Extension

This is a Directus hook extension that checks if `personal_code` already exists in the `journal` collection and validates against lithuanian personal code structure algorithm when a specific event occurs in Directus.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd extensions/lt-personal-code-validator
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To use this hook extension, you need to register it in your Directus instance. Follow these steps:

1. Ensure that the hook is properly configured in your Directus settings.
2. The hook will automatically check for the existence of `personal_code` in the `journal` collection during the specified event.

## Contributing

Feel free to submit issues or pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.