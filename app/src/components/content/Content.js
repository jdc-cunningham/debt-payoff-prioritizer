import React from 'react';
import './Content.scss';

const Content = (props) => {
	return (
		<div className="debt-payoff-prioritizer__content">
            { console.log(props.debts) }
		</div>
	);
}

export default Content;