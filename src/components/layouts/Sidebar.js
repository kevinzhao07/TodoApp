import React from 'react';
import { FaInbox, FaCalendarDay, FaCalendarAlt, FaCalendarWeek, FaChevronDown } from 'react-icons/fa';

export const Sidebar = () => {
    return (
        <div className="sidebar" data-testid="sidebar">
            <ul className="sidebar_top">
                <li><span><FaInbox /></span><span>Inbox</span></li>
                <li><span><FaCalendarDay /></span><span>Today</span></li>
                <li><span><FaCalendarWeek /></span><span>Next 7 Days</span></li>
            </ul>

            <div className="sidebar_middle">
                <span>< FaChevronDown /></span>
                <h2> Projects </h2>
            </div>

            <ul className="sidebar_projects">
                Projects here.
            </ul>

            Other Project Components Here.
        </div>
    );
}