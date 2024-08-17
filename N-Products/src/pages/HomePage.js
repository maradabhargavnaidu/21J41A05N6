import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import ProductList from '../components/ProductList';
import Filters from '../components/Filters';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    availability: false,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getProducts = async () => {
      const { category, company, minPrice, maxPrice, rating, availability } = filters;
      const topN = 20; // Adjust this as needed
      const fetchedProducts = await fetchProducts(company, category, minPrice, maxPrice, topN);

      setProducts(fetchedProducts.slice((page - 1) * 10, page * 10)); // Adjust pagination
      setTotalPages(Math.ceil(fetchedProducts.length / 10));
    };

    getProducts();
  }, [filters, page]);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <Filters filters={filters} onChange={handleFilterChange} />
      <ProductList products={products} onPageChange={setPage} page={page} totalPages={totalPages} />
    </div>
  );
};

export default HomePage;
