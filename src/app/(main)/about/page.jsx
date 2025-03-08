import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Company Name</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#about" className="hover:text-blue-600">About</a></li>
            <li><a href="#mission" className="hover:text-blue-600">Mission</a></li>
            <li><a href="#stats" className="hover:text-blue-600">Stats</a></li>
          </ul>
        </nav>
      </header>

      {/* About Us Section */}
      <section id="about" className="container mx-auto p-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-600">We are committed to delivering quality services and helping businesses grow. Lorem ipsum dolor,
            sit amet consectetur adipisicing elit. Commodi et facilis,
            ipsam modi aut maxime eius rerum sunt! Amet, qui.</p>
        </div>
        <div>
          <img src="https://media.istockphoto.com/id/1443245439/photo/business-meeting-businesswoman-woman-office-portrait-job-career-happy-businessman-teamwork.jpg?s=612x612&w=0&k=20&c=1ZR02c1UKfGdBCNWzzKlrwrVZuEiOqnAKcKF4V_t038=" alt="Mission" className="rounded-lg shadow-md" />
        </div>
      </section>

      {/* Mission & Story Section */}
      <section id="mission" className="container mx-auto p-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img src="https://www.susangreenecopywriter.com/wp-content/uploads/2013/01/photo-1484544808355-8ec84e534d75-1.jpg" alt="Mission" className="rounded-lg shadow-md" />
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-2 text-center">Our Mission</h3>
          <p className="text-gray-600 text-center">Helping millions of organizations grow better with innovative solutions
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni at adipisci incidunt facilis culpa fugiat</p>
        </div>
      </section>

      <section id="story" className="container mx-auto p-6 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-semibold mb-2 text-center">Our Project</h3>
          <p className="text-gray-600 text-center">From humble beginnings to a global company,
             our journey has been all about innovation and dedication Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Perspiciatis, iste.</p>
        </div>
        <div>
          <img src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page-1200x675.png" alt="Story" className="rounded-lg shadow-md" />
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats" className="container mx-auto p-6 text-center">
        <h3 className="text-3xl font-semibold mb-4">HubSpot By the Numbers</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold">1200</h4>
            <p className="text-gray-600">Projects</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold">7,000+</h4>
            <p className="text-gray-600">Admin</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold">200,000+</h4>
            <p className="text-gray-600">Students</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
