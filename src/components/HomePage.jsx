import React from 'react';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Our E-Commerce Store!</h1>
      <p>Explore a wide range of products tailored to your needs.</p>

      <h2 style={{ marginTop: '40px' }}>Featured Products</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {/* 示例产品卡片 */}
        <div style={{ border: '1px solid #ccc', padding: '20px', marginRight: '10px' }}>
          <img src="images/product1.jpg" alt="Product 1" style={{ width: '150px', height: '150px' }} />
          <h3>Product 1</h3>
          <p>$19.99</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', marginRight: '10px' }}>
          <img src="images/product2.jpg" alt="Product 2" style={{ width: '150px', height: '150px' }} />
          <h3>Product 2</h3>
          <p>$29.99</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px' }}>
          <img src="images/product3.jpg" alt="Product 3" style={{ width: '150px', height: '150px' }} />
          <h3>Product 3</h3>
          <p>$39.99</p>
        </div>
      </div>

      <footer style={{ marginTop: '50px', padding: '10px', backgroundColor: '#f8f9fa' }}>
        <p>@2024 E-Commerce Web App. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default HomePage;

