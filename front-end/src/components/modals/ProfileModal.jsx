import React, { useContext, useState } from "react";
import { context } from "../../context/UserContext";
import { TbEdit } from "react-icons/tb";
import { BiLogoGmail } from "react-icons/bi";
import { FaInfo } from "react-icons/fa";
import {
    BsArrowLeftShort,
    BsFillPersonFill,
    BsTelephoneFill,
    BsCameraFill,
} from "react-icons/bs";
import "../../Styles/profile.css";
const ProfileModal = ({ closeModal }) => {
    const { user } = useContext(context);
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const handleProfileHover = (e) => {
        setIsMouseEnter(true);
    };

    const handleMouseLeave = (e) => {
        setIsMouseEnter(false);
    };

    // post request to change profile photo
    const handleProfileChange = ()=>{
        console.log("profile changed");
    }

    // post request to change name
    const handleNameChange = ()=>{
        console.log("name changed");
    }

    // post request to change name
    const handleAboutChange = ()=>{
        console.log("about changed");
    }

    return (
        user && (
            <div className="profile-bg">
                <div className="profile-div">
                    <div className="profile-header">
                        <BsArrowLeftShort
                            onClick={() => {
                                closeModal(false);
                            }}
                            className="profile-header-back-btn"
                        />
                        <p>Profile</p>
                    </div>
                    <div
                        className={
                            isMouseEnter ? "profile-pic overlay" : "profile-pic"
                        }
                        onClick={handleProfileChange}
                        onMouseEnter={handleProfileHover}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="pic">
                            <img src={user.profile} alt="profile" width={50} />
                        </div>
                        {isMouseEnter && (
                            <BsCameraFill className="profile-camera" />
                        )}
                    </div>
                    <div className="profile-info">
                        <div className="profile-info-name">
                            <BsFillPersonFill />
                            <div className="name">
                                <p className="info-head">Name</p>
                                <p className="info-value">
                                    {user.name.toLowerCase()}
                                </p>
                            </div>
                            <TbEdit className="edit-btn" onClick={handleNameChange} />
                        </div>
                        <div className="profile-info-about">
                            <FaInfo />
                            <div className="name">
                                <p className="info-head">About</p>
                                <p className="info-value">
                                    {user?.about
                                        ? user.about
                                        : "hey i am using chatHub"}
                                </p>
                            </div>
                            <TbEdit className="edit-btn" onClick={handleAboutChange}/>
                        </div>
                        <div className="profile-info-gmail">
                            <BiLogoGmail />
                            <div className="gmail">
                                <p className="info-head">Gmail</p>
                                <p className="info-value">{user.gmail}</p>
                            </div>
                        </div>
                        <div className="profile-info-phone">
                            <BsTelephoneFill />
                            <div className="phone">
                                <p className="info-head">Phone</p>
                                <p className="info-value">{user.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProfileModal;
