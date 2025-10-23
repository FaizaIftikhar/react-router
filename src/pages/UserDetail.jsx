import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "./Load";
import Error from "./Error";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing]=useState(false);
  const [success, setSuccess]=useState(false);
  const [formData,setFormData]=useState(
    {
      name:" ",
      email: "",
      phone: "",
    }
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error("Failed to fetch user details");
        const data = await response.json();
        setUser(data);
        setFormData(
          {
            name:data.name,
            email:data.email,
            phone:data.phone,
          }
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);
  //Handle input change in edit form
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({...prev,[name]:value}));

  }
  //handle put request
  const handleUpdate=async (e)=>{
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try{
      const response =await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(formData),
        }

      );
      if (!response.ok) throw new Error("Failed to update user");
      const updatedData=await response.json();
      setUser(updatedData);
      setSuccess(true);
      setIsEditing(false);
    }
    catch (err){
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  }


  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

   return (
    <div className="user-details">
      <h2>User Details</h2>

      {!isEditing ? (
        <>
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <br />
          <Link to="/users" className="back-btn">← Back to Users</Link>
        </>
      ) : (
        <form onSubmit={handleUpdate} className="edit-form">
          <div>
            <label>Name:</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Phone:</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit"> Save Changes</button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="cancel-btn"
          >
            Cancel
          </button>
        </form>
      )}

      {success && <p className="success"> User updated successfully!</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserDetails;
