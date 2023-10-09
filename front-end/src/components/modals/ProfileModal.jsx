import React, { useContext } from "react";
import { context } from "../../context/UserContext";
import { TbEdit } from "react-icons/tb";
import { BiLogoGmail } from "react-icons/bi";
import {
    BsArrowLeftShort,
    BsFillPersonFill,
    BsTelephoneFill,
    BsCameraFill,
} from "react-icons/bs";
import "../../Styles/profile.css";
const ProfileModal = ({ closeModal }) => {
    const { user } = useContext(context);
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
                    <div className="profile-pic">
                        <div className="pic">
                            <img src={user.profile} alt="profile" width={50} />
                        </div>
                        <BsCameraFill className="profile-camera"/>
                    </div>
                    <div className="profile-info">
                        <div className="profile-info-name">
                            <BsFillPersonFill />
                            <div className="name">
                                <p className="info-head">Name</p>
                                <p className="info-value">{user.name.toLowerCase()}</p>
                            </div>
                            <TbEdit className="edit-btn"/>
                        </div>
                        <div className="profile-info-gmail">
                            <BiLogoGmail />
                            <div className="gmail">
                                <p className="info-head">Gmail</p>
                                <p className="info-value">{user.gmail}</p>
                            </div>
                            <TbEdit className="edit-btn"/>
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
