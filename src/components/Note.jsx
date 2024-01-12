import React from "react";
import { motion } from "framer-motion";
import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
    function handleClick() {
        props.onDelete(props.id);
    }

    return (
        <motion.div
            className="note"
            whileHover={{ scale: 1.1 }} // Scale up on hover
            onClick={handleClick} // Trigger onClick event on click
        >
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button className="deleteIcon">
                <DeleteIcon />
            </button>
        </motion.div>
    );
}

export default Note;
