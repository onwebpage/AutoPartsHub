const updates = [
  { partId: "ENG-001", imageUrl: "/images/engine-1.jpg" },
  { partId: "TRN-002", imageUrl: "/images/transmission-1.jpg" },
  { partId: "CHS-003", imageUrl: "/images/chassis-1.jpg" },
  { partId: "ENG-004", imageUrl: "/images/engine-1.jpg" },
  { partId: "TRN-005", imageUrl: "/images/transmission-1.jpg" },
  { partId: "AXL-006", imageUrl: "/images/axle-1.jpg" },
  { partId: "DIF-007", imageUrl: "/images/differential-1.jpg" },
  { partId: "ENG-008", imageUrl: "/images/engine-1.jpg" },
  { partId: "AXL-009", imageUrl: "/images/axle-1.jpg" },
  { partId: "TRN-010", imageUrl: "/images/transmission-1.jpg" },
];

async function updateProducts() {
  const response = await fetch('http://localhost:5000/api/products');
  const products = await response.json();
  
  for (const update of updates) {
    const product = products.find(p => p.partId === update.partId);
    if (product) {
      const formData = new FormData();
      formData.append('imageUrl', update.imageUrl);
      
      const res = await fetch(`http://localhost:5000/api/products/${product.id}`, {
        method: 'PUT',
        body: formData,
      });
      
      if (res.ok) {
        console.log(`✅ Updated ${update.partId} with imageUrl: ${update.imageUrl}`);
      } else {
        console.log(`❌ Failed to update ${update.partId}`);
      }
    }
  }
}

updateProducts();
