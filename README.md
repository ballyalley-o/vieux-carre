![App Icon](/public/image/svg/vieux-carre-red.svg) &nbsp;

Vieux Carre
#
- [](#)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction
**Vieux Carre** is a showcase application built with Next.js and Tailwind CSS. It is a shopping platform that allows users to browse products, add them to their cart, and make purchases. The application is fully responsive and includes features like user authentication, notifications, and dark mode.

## Features
- **Task Management**: Create, update, and delete tasks.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Works on both desktop and mobile devices.
- **Notifications**: Get notified about upcoming deadlines.
- **Dark Mode**: Switch between light and dark themes.

## Installation
To get started with **My Awesome App**, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/ballyoop/vieux-carre.git
    cd vieux-carre
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    NEXT_PUBLIC_API_URL=https://api.example.com
    NEXT_PUBLIC_PAYMENT_METHODS="PayPal;Stripe;Cash"
    NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD="PayPal"
    ```

4. **Run the application**:
    ```sh
    npm run dev
    ```

## Usage
Once the application is running, you can access it at `http://localhost:3000`. Register for an account or log in if you already have one. Start creating and managing your tasks right away!

## Configuration
The application can be configured using environment variables. Here are some of the key variables you can set:

- `NEXT_PUBLIC_API_URL`: The base URL for the API.
- `NEXT_PUBLIC_PAYMENT_METHODS`: A semicolon-separated list of payment methods.
- `NEXT_PUBLIC_DEFAULT_PAYMENT_METHOD`: The default payment method.

## Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with a clear message.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.