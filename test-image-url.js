const testData = {
  partId: "TEST-DEBUG",
  type: "engine",
  year: 2022,
  make: "Test",
  model: "Test",
  details: "Test",
  price: 100000,
  status: "In Stock",
  customer: "Pending",
  imageUrl: "/images/test.jpg",
  protection: "90-Day Return",
  location: "Test",
  description: "Test"
};

console.log('Sending:', JSON.stringify(testData, null, 2));

fetch('http://localhost:5000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData),
})
.then(res => res.json())
.then(data => {
  console.log('\nReceived:', JSON.stringify(data, null, 2));
  console.log('\nimageUrl sent:', testData.imageUrl);
  console.log('imageUrl received:', data.imageUrl);
});
