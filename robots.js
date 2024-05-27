import fetch from 'node-fetch';
import { URL } from 'url';

// Function to extract allowed URLs from robots.txt
async function extractAllowedUrls(robotstxt) {
    const lines = robotstxt.split('\n');
    const allowedUrls = new Set();

    lines.forEach(line => {
        if (line.startsWith('Allow:')) {
            const urlPath = line.substring(6).trim();
            if (urlPath.startsWith('/')) {
                const url = new URL(urlPath, robotstxtUrl);
                allowedUrls.add(url.href);
            }
        }
    });

    return allowedUrls;
}

// URL of the robots.txt file
const robotstxtUrl = 'https://www.g2.com/robots.txt';

// Fetch the content of robots.txt
fetch(robotstxtUrl)
    .then(response => response.text())
    .then(robotstxt => {
        console.log('Robots.txt Content:', robotstxt); // Log the content of robots.txt
        // Extract allowed URLs
        return extractAllowedUrls(robotstxt);
    })
    .then(allowedUrls => {
        console.log('Allowed URLs:'); // Log a message before printing the URLs
        // Print the allowed URLs
        allowedUrls.forEach(url => {
            console.log(url);
        });
    })
    .catch(error => {
        console.error('Error fetching or processing robots.txt:', error);
    });
