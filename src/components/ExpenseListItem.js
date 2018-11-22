import React from 'react';
import {Link} from 'react-router-dom';

const ExpenseListItem = ({  description, amount, createdAt, id}) => (
    <div>
        <h3><Link to={`edit/${id}`}>
                {description}
            </Link>
        </h3>
        <p>Amount: {amount} - CreatedAt: {createdAt}</p>
        
    </div>
);

export default ExpenseListItem;