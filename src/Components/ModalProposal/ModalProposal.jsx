import React, { useEffect, useState } from 'react'
import "./ModalProposal.css"
import { FiClock } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsClockHistory } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import { TiMessage } from "react-icons/ti";
import { LucideAlertTriangle } from 'lucide-react';
import { MdOutlineCancelPresentation } from "react-icons/md";
import axios from 'axios';

const ModalProposal = ({ toclose, setReview, info, setInfo, setReject }) => {
    const [ErrandId, setErrandId] = useState([])
    const [loading, setLoading] = useState(true);
    const BaseUrl = import.meta.env.VITE_BASE_URL
    const token = JSON.parse(localStorage.getItem("userToken"));

    const ErrandById = async () => {
        try {
            setLoading(true);

            if (!token) {
                setErrandId([]);
                return;
            }

            const res = await axios.get(
                `${BaseUrl}/applicant/${info?.errandId}/${info?.runnerId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setErrandId(res?.data?.data || []);
        } catch (err) {
            setErrandId([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        ErrandById();
    }, []);

    return (
        <div className="rb-overlay">
            {ErrandId?.map((item) => (
                <div className="rb-modal" key={item.id}>
                    <button className="rb-close" onClick={() => toclose(false)}>
                        <IoClose size={22} />
                    </button>

                    <div className="rb-top">
                        <div style={{ display: "flex" }}>
                            <div className="rb-avatar">
                                {item?.runner?.firstName?.charAt(0).toUpperCase() +
                                    item?.runner?.lastName?.charAt(0).toUpperCase()}
                            </div>

                            <div className="rb-details">
                                <h3 className="rb-name">
                                    {item?.runner?.firstName} {item?.runner?.lastName}
                                </h3>
                                <p className="rb-rating">
                                    <AiFillStar size={16} color="#F8B400" /> {item?.runner?.rating} •{" "}
                                    {item?.runner?.totalJobs} jobs completed
                                </p>
                            </div>
                        </div>

                        <div className="rb-price-box">
                            <p>Proposed Price</p>
                            <h3>₦{item?.bidPrice || item?.currentPrice}</h3>
                        </div>
                    </div>

                    <div className="rb-message-box">
                        <p className="rb-message-label">
                            <TiMessage size={18} /> <strong className="msg">Message:</strong>
                        </p>
                        <p className="rb-message-text">{item?.runner?.bio}</p>
                    </div>

                    <div className="rb-warning">
                        <LucideAlertTriangle size={18} />
                        <span>
                            Runner wants ₦{item?.bidPrice || item?.currentPrice} for the offer
                        </span>
                    </div>

                    <div className="rb-actions">

                        {/* FIXED BUTTON — PRICE WILL NOW SHOW IN RejectModal */}
                        <button
                            className="rb-reject"
                            onClick={() => {
                                setInfo((prev) => ({
                                    ...prev,
                                    applicationId: item?.id,
                                    bidPrice: item?.bidPrice,
                                    currentPrice: item?.currentPrice,
                                    runnerName: `${item?.runner?.firstName} ${item?.runner?.lastName}`,
                                    runnerId: item?.runnerId,
                                    errandId: item?.errandId,
                                    title: info?.title,
                                }));

                                toclose(false);
                                setReject(true);
                            }}
                        >
                            <MdOutlineCancelPresentation /> Reject
                        </button>

                        <button
                            className="rb-accept"
                            onClick={() => {
                                setReview(true);
                                toclose(false);

                                setInfo((prev) => ({
                                    ...prev,
                                    applicationId: item?.id,
                                    bidPrice: item?.bidPrice,
                                    currentPrice: item?.currentPrice,
                                    runnerName: `${item?.runner?.firstName} ${item?.runner?.lastName}`,
                                    runnerId: item?.runnerId,
                                    errandId: item?.errandId,
                                }));
                            }}
                        >
                            ✔ ₦{item?.bidPrice || item?.currentPrice}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ModalProposal;
