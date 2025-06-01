// Test script to verify backend connectivity
const fetch = require('node-fetch');

async function testBackend() {
    console.log('Testing backend connectivity...');
    
    try {
        // Test basic connectivity
        console.log('1. Testing basic endpoint...');
        const basicResponse = await fetch('http://localhost:5000/');
        console.log(`Basic endpoint status: ${basicResponse.status}`);
        
        // Test user endpoint
        console.log('2. Testing user getall endpoint...');
        const userResponse = await fetch('http://localhost:5000/user/getall');
        console.log(`User endpoint status: ${userResponse.status}`);
        
        if (userResponse.ok) {
            const users = await userResponse.json();
            console.log(`Found ${users.length} users`);
            if (users.length > 0) {
                console.log('Sample user:', users[0]);
            }
        } else {
            console.log('User endpoint failed');
        }
        
    } catch (error) {
        console.error('Backend test failed:', error.message);
        console.log('Make sure the backend server is running on port 5000');
    }
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
    console.log('Note: This test requires Node.js 18+ or install node-fetch');
    console.log('You can test manually by opening: http://localhost:5000/user/getall');
} else {
    testBackend();
}
