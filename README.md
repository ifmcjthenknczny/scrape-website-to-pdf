# scrape-website-to-pdf
## Overview

This repository provides a Node.js script that automates the process of scraping web pages and saving their contents as PDF files. The script utilizes the Puppeteer library to interact with web pages, and the FS module to manage file operations. The primary function, scrapePagesToPdfs, orchestrates the scraping of multiple pages defined in the configuration file and saves them as PDFs in a specified directory.

## Installation
### Prerequisites

    Node.js (v14 or higher)
    npm (v6 or higher)

### Setup

#### Clone the Repository:

```bash
git clone <repository_url>
cd <repository_directory>
```

#### Install Dependencies:

Run the following command to install all necessary dependencies:

```bash
npm install
```

#### Configuration:

Ensure that the config.js file is correctly set up with the following exports:

    ROOT: The base URL for the pages to be scraped.
    SUBPAGES: An array of page paths to be appended to the root URL.
    SCRAPE_CSS_SELECTOR: The CSS selector used to ensure that the page content is fully loaded.
    IGNORE_CSS_SELECTORS: An array of CSS selectors for elements to be removed from the page before saving it as a PDF.

Example config.js:

```javascript
    export const ROOT = 'https://example.com';
    export const SUBPAGES = ['page1', 'page2', 'page3'];
    export const SCRAPE_CSS_SELECTOR = '#content';
    export const IGNORE_CSS_SELECTORS = ['.ads', '.sidebar'];
```

## Usage
### Running the Script

To run the script and scrape the web pages as PDFs, execute the following command:

```bash
npm start
```

This command will compile Typescript files to JS and run them.

### Output

The script will create a pdf directory in the project root if it doesn't already exist. All generated PDF files will be saved in this directory with filenames corresponding to their page order.

## Contributing

Feel free to submit issues or pull requests if you find any bugs or want to add new features. Please ensure that your code follows the project's style guidelines.

## License

This project is licensed under the MIT License. See the LICENSE file for details.