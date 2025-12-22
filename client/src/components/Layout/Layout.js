import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />

      <main
        className="container-fluid"
        style={{
          minHeight: "85vh",
          marginTop: "80px",
          paddingBottom: "120px",
        }}
      >
        <Toaster />
        {children}
      </main>

      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce app",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb,ecommerce",
  author: "Apekshya Bijaya",
};

export default Layout;
