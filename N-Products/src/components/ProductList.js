import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ products, onPageChange, page, totalPages }) => {
  return (
    <div>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
            <h5>{product.name}</h5>
            <p>{product.company}</p>
            <p>{product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</p>
            <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
          </div>
        ))}
      </div>
      <nav>
        <ul className="pagination">
          {[...Array(totalPages).keys()].map(num => (
            <li key={num} className={`page-item ${page === num + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => onPageChange(num + 1)}>{num + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;
