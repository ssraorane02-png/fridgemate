import "../styles/FamilySharing.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FaUserPlus, FaUserCircle, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";

function FamilySharing() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
const user = JSON.parse(
  localStorage.getItem("user")
);
  // Temporary data (API later)
  const [members, setMembers] =
  useState([]);

  const inviteMember = async () => {
  if (!email.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Enter Email",
      text: "Please enter an email.",
    });
    return;
  }

  try {
    await axios.post(
  "https://fridgemate-ym3b.onrender.com/api/family/invite",
  {
    email,
    userId: user.id,
  }
);

    Swal.fire({
      icon: "success",
      title: "Invitation Sent!",
      text: `Invitation sent to ${email}`,
    });
    fetchMembers();   // <-- here


    setEmail("");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Could not send invitation.",
      
    });
  }
};

  const removeMember = async (name) => {
  const result =
    await Swal.fire({
      title: `Remove ${name}?`,
      text: "Member will lose access.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1A8FB4",
      confirmButtonText: "Remove",
    });

  if (!result.isConfirmed)
    return;

  try {
    await axios.delete(
      "https://fridgemate-ym3b.onrender.com/api/family/remove",
      {
        data: {
          userId: user.id,
          name,
        },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Removed",
      text: `${name} has been removed.`,
    });

    fetchMembers();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        "Could not remove member.",
    });
  }
};

  useEffect(() => {
  fetchMembers();
}, []);

const fetchMembers = async () => {
  try {
    const response =
      await axios.get(
        `https://fridgemate-ym3b.onrender.com/api/family/${user.id}`
      );

    const family =
      response.data;

    const memberList = [];

    if (family.owner) {
      memberList.push({
        id: family.owner._id,
        name:
          family.owner.name,
        role: "Owner",
      });
    }

    family.members?.forEach(
  (member, index) => {
    memberList.push({
      id: index,
      name: member.name,
      role: "Member",
    });
  }
);

    setMembers(memberList);
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div className="family-page">

      <Navbar
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      )}

      <div className="family-container">

        <h1>Family Sharing</h1>

        <div className="invite-card">

          <h2>Invite Family Member</h2>

          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button onClick={inviteMember}>
            <FaUserPlus />
            Send Invitation
          </button>

        </div>

        <div className="members-card">

          <h2>Current Members</h2>

          {members.map((member) => (

            <div
              className="member-row"
              key={member.id}
            >

              <div className="member-info">

                <FaUserCircle className="member-icon" />

                <div>

                  <h3>{member.name}</h3>

                  <span>{member.role}</span>

                </div>

              </div>

              {member.role !== "Owner" && (

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeMember(member.name)
                  }
                >
                  <FaTrash />
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default FamilySharing;