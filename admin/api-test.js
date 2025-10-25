// API Connection Test Script
// Run this in the browser console to test API connectivity

const testApiConnection = async () => {
  const API_URL = 'https://crmplatform9.onrender.com/api';
  
  console.log('🔍 Testing API Connection...');
  console.log('API URL:', API_URL);
  
  try {
    // Test 1: Basic fetch to root API
    console.log('\n📡 Test 1: Basic API Root');
    const rootResponse = await fetch(API_URL);
    console.log('Status:', rootResponse.status);
    console.log('Headers:', Object.fromEntries(rootResponse.headers.entries()));
    
    if (rootResponse.ok) {
      const rootData = await rootResponse.json();
      console.log('Response:', rootData);
    }
    
    // Test 2: Health endpoint
    console.log('\n🏥 Test 2: Health Endpoint');
    const healthResponse = await fetch(`${API_URL}/health`);
    console.log('Status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('Health Response:', healthData);
    }
    
    // Test 3: Articles endpoint
    console.log('\n📰 Test 3: Articles Endpoint');
    const articlesResponse = await fetch(`${API_URL}/articles`);
    console.log('Status:', articlesResponse.status);
    
    if (articlesResponse.ok) {
      const articlesData = await articlesResponse.json();
      console.log('Articles Response:', articlesData);
    }
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error) {
    console.error('\n❌ API Connection Failed:');
    console.error('Error:', error);
    console.error('Message:', error.message);
    console.error('Type:', error.name);
    
    // Additional debugging info
    console.log('\n🔧 Debugging Information:');
    console.log('User Agent:', navigator.userAgent);
    console.log('Current URL:', window.location.href);
    console.log('Protocol:', window.location.protocol);
    
    // Check if it's a CORS issue
    if (error.message.includes('CORS') || error.message.includes('cross-origin')) {
      console.log('\n🚫 CORS Issue Detected!');
      console.log('The API server needs to allow requests from your domain.');
      console.log('Check if the backend has proper CORS configuration.');
    }
    
    // Check if it's a network issue
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      console.log('\n🌐 Network Issue Detected!');
      console.log('Possible causes:');
      console.log('- API server is down');
      console.log('- Network connectivity issues');
      console.log('- Firewall blocking the request');
    }
  }
};

// Run the test
testApiConnection();
