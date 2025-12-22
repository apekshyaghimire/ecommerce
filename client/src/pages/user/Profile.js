// import React, { useState, useEffect } from "react";
// import UserMenu from "../../components/Layout/UserMenu";
// import Layout from "./../../components/Layout/Layout";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import axios from "axios";
// const Profile = () => {
//   //context
//   const [auth, setAuth] = useAuth();
//   //state
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");

//   //get user data
//   useEffect(() => {
//     const { email, name, phone, address } = auth?.user;
//     setName(name);
//     setPhone(phone);
//     setEmail(email);
//     setAddress(address);
//   }, [auth?.user]);

//   // form function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.put("/api/v1/auth/profile", {
//         name,
//         email,
//         password,
//         phone,
//         address,
//       });
//       if (data?.errro) {
//         toast.error(data?.error);
//       } else {
//         setAuth({ ...auth, user: data?.updatedUser });
//         let ls = localStorage.getItem("auth");
//         ls = JSON.parse(ls);
//         ls.user = data.updatedUser;
//         localStorage.setItem("auth", JSON.stringify(ls));
//         toast.success("Profile Updated Successfully");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };
//   // return (
//   //   <Layout title={"Your Profile"}>
//   //     <div className="container-fluid m-5 p-3 dashboard">
//   //       <div className="row">
//   //         <div className="col-md-3">
//   //           <UserMenu />
//   //         </div>
//   //         <div className="col-md-8 d-flex">
//   //           <div className="form-container" mt-4>
//   //             <form onSubmit={handleSubmit}>
//   //               <h4 className="title">USER PROFILE</h4>
//   //               <div className="mb-3">
//   //                 <input
//   //                   type="text"
//   //                   value={name}
//   //                   onChange={(e) => setName(e.target.value)}
//   //                   className="form-control"
//   //                   id="exampleInputEmail1"
//   //                   placeholder="Enter Your Name"
//   //                   autoFocus
//   //                 />
//   //               </div>
//   //               <div className="mb-3">
//   //                 <input
//   //                   type="email"
//   //                   value={email}
//   //                   onChange={(e) => setEmail(e.target.value)}
//   //                   className="form-control"
//   //                   id="exampleInputEmail1"
//   //                   placeholder="Enter Your Email "
//   //                   disabled
//   //                 />
//   //               </div>
//   //               <div className="mb-3">
//   //                 <input
//   //                   type="password"
//   //                   value={password}
//   //                   onChange={(e) => setPassword(e.target.value)}
//   //                   className="form-control"
//   //                   id="exampleInputPassword1"
//   //                   placeholder="Enter Your Password"
//   //                 />
//   //               </div>
//   //               <div className="mb-3">
//   //                 <input
//   //                   type="text"
//   //                   value={phone}
//   //                   onChange={(e) => setPhone(e.target.value)}
//   //                   className="form-control"
//   //                   id="exampleInputEmail1"
//   //                   placeholder="Enter Your Phone"
//   //                 />
//   //               </div>
//   //               <div className="mb-3">
//   //                 <input
//   //                   type="text"
//   //                   value={address}
//   //                   onChange={(e) => setAddress(e.target.value)}
//   //                   className="form-control"
//   //                   id="exampleInputEmail1"
//   //                   placeholder="Enter Your Address"
//   //                 />
//   //               </div>

//   //               <button type="submit" className="btn btn-primary">
//   //                 UPDATE
//   //               </button>
//   //             </form>
//   //           </div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </Layout>
//   // );


//   return (
//   <Layout title={"Your Profile"}>
//     <div className="container-fluid dashboard p-3">
//       <div className="row">
//         {/* LEFT MENU */}
//         <div className="col-md-3">
//           <UserMenu />
//         </div>

//         {/* RIGHT CONTENT */}
//         <div className="col-md-9">
//           <div className="profile-bg d-flex justify-content-center align-items-center">
//             <div className="form-container shadow bg-white p-4">
//               <form onSubmit={handleSubmit}>
//                 <h4 className="title text-center mb-4">
//                   USER PROFILE
//                 </h4>

//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter Your Name"
//                     autoFocus
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     value={email}
//                     className="form-control"
//                     placeholder="Enter Your Email"
//                     disabled
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter Your Password"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter Your Phone"
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter Your Address"
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-dark w-100">
//                   UPDATE
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   </Layout>
// );

// };

// export default Profile;

import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Load user data
  useEffect(() => {
    if (auth?.user) {
      const { name, email, phone, address } = auth.user;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, [auth?.user]);

  // Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Your Profile">
      <div className="container-fluid dashboard p-0">
        <div className="row g-0">

          {/* LEFT MENU */}
          <div className="col-md-3">
            <UserMenu />
          </div>

          {/* RIGHT SIDE — FULL BACKGROUND */}
          <div className="col-md-9 profile-bg d-flex justify-content-center align-items-center">
            <div className="form-container shadow bg-white p-4">
              <form onSubmit={handleSubmit}>
                <h4 className="title text-center mb-4">
                  USER PROFILE
                </h4>

                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Password"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Phone"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-dark w-100">
                  UPDATE
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Profile;
