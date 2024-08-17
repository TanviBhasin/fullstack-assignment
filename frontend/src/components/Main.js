import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default function Main() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch cards from API
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/cards');
        setCards(response.data);
        toast.success('Cards fetched successfully!');
      } catch (error) {
        toast.error('Error fetching cards. Please try again later.');
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  // Filter cards based on search term
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header>
        <div className="logo-title topbar">
          <img className="topbar-logo" src="./assets/img/topbar logo.svg" alt="logo" />
          <h5 className='ms-1'> | Help Center</h5>
        </div>
        <div className="buttons">
          <button className="submit-button">Submit a request</button>
        </div>
      </header>
      <div className="hero-section">
        <div className="hero-container">
          <p className=''>How can we help?</p>
          <input
            type="text"
            placeholder="Search"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fa-solid fa-arrow-right" />
        </div>
      </div>
      <div className="property-container">
        <div className="mx-auto ms-5">
          <div className="property-lists">
            {filteredCards.length > 0 ? (
              filteredCards.map((card) => (
                <div className="list-item" key={card._id}>
                  <div className="card text-bg-light mb-3" style={{ width: "412px", borderRadius: "10px" }}>
                    <div className="card-header"><b>{card.title}</b></div>
                    <div className="card-body">
                      <p className="card-text">
                        {card.description}
                      </p><br/><br/>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No cards found</p>
            )}
          </div>
        </div>
      </div>
      <footer>
        <div className="footer-container">
          <div className="footer-items">
            <h5 className='mb-3'>Abstract</h5>
            <h6>Branches</h6>
          </div>
          <div className="footer-items">
            <h5 className='mb-3'>Resources</h5>
            <h6>Blog</h6>
            <h6>Help Center</h6>
            <h6>Release Notes</h6>
            <h6>Status</h6>
          </div>
          <div className="footer-items">
            <h5 className='mb-3'>Community</h5>
            <h6>Twitter</h6>
            <h6>LinkedIn</h6>
            <h6>Facebook</h6>
            <h6>Dribbble</h6>
            <h6>Podcast</h6>
          </div>
          <div className="footer-items">
            <h5 className='mb-3'>Company</h5>
            <h6>About Us</h6>
            <h6>Careers</h6>
            <h6>Legal</h6>
            <br />
            <h6>Contact Us</h6>
            <h6>info@abstract.com</h6>
          </div>
          <div className="footer-copyright">
            <img src="./assets/img/footer-logo.png" alt="" srcSet="" />
            <h6 className='mt-3'>&copy; Copyright 2022</h6>
            <h6>Abstract Studio Design, Inc.</h6>
            <h6>All rights reserved</h6>
          </div>
        </div>
      </footer>
      <ToastContainer />
    </>
  );
}
