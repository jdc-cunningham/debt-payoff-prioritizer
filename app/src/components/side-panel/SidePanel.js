import React, { useRef, useEffect } from 'react';
import './SidePanel.scss';

const SidePanel = (props) => {
    const debtInput = useRef(null);
    const minPaymentInput = useRef(null);
    const paymentInput = useRef(null);
    console.log('sidePanel');

    const introContent = () => {
        return (
            <div className="side-panel__intro">
                <h1>Orbital Debt Strike</h1>
                <p>A free debt payment prioritizer</p>
                <p className="instructions">
                    This app allows you to enter individual debt balances along with a minimum payment, then rank them top to bottom.
                     After this you can specify how much you can pay and then this tool will distribute that money to apply payments in
                     descending amounts with the greatest amount being applied to the first debt. This is just like the avalanche payoff method.
                     <br />
                     If there are any debts where the distributed amount is less than the minimum, some will be taken from the first debt(this gets the most payment).
                </p>
            </div>
        )
    }

    const createDebtEntry = () => {
        return (
            <div className="side-panel__create-debt-entry">
                <p>Start by adding your first debt. The minimum payment is optional.</p>
                <span>Balance</span>
                <span className="wrapper">
                    <span>$</span>
                    <input ref={ debtInput } type="number" placeholder="0.00" />
                </span>
                <span>Minimum payment</span>
                <span className="wrapper">
                    <span>$</span>
                    <input ref={ minPaymentInput } type="number" placeholder="0.00" />
                </span>
                <button onClick={ addDebt } type="button">Add Debt</button>
            </div>
        )
    }

    const createPaymentEntry = () => {
        return (
            <div className="side-panel__create-payment-entry">
                <p>Here you can add what you want to pay towards all the debts</p>
                <span>Payment Amount</span>
                <span className="wrapper">
                    <span>$</span>
                    <input ref={ paymentInput } type="number" placeholder="0.00" />
                </span>
                <button onClick={ setPayment } type="button">Calculate</button>
            </div>
        )
    }

    // taking in text but expects to be integer or float
    // stolen from SO
    const isNumber = (n) => {
        if (!n) {
          var n = this.cardBalance.value;
        }
    
        var regexp = /^[0-9.]*$/;
        var isIntFloat = regexp.test(n);
        
        if (isIntFloat) {
          return true;
        }
    
        return false;
    }

    // these should be dependent props, which ever one runs first can create the other
    const setPayment = () => {
        const payment = paymentInput.current.value;

        if (!payment.length) {
            alert('Please enter a value for payment');
            return false;
        }

        if (!isNumber(payment)) {
            alert('Please check the format for payment. Example: 0.00 or just 0');
            return false;
        }

        if (!props.store || typeof props.store.payment === "undefined") {
            const newDebtObj = {
                "debts": [],
                payment
            };
            props.setStore(newDebtObj);
        } else {
            const debtsCopy = (typeof props.store.debts !== "undefined") ? props.store.debts : 0
            props.setStore({
                "debts": debtsCopy,
                payment
            });
        }
    }

    // these should be dependent props, which ever one runs first can create the other
    const addDebt = () => {
        const balance = debtInput.current.value;
        const minPayment = minPaymentInput.current.value;

        if (!balance.length || !minPayment.length) {
            alert('Please fill in both balance and mininum payment to add a debt');
            return false;
        }

        if (!isNumber(balance) || !isNumber(minPayment)) {
            alert('Please check the format for balance and min payment. Example: 0.00 or just 0');
            return false;
        }

        const newDebt = {
            balance,
            minPayment
        };

        if (!props.store || typeof props.store.debts === "undefined") {
            const newDebtObj = {
                "debts": [newDebt],
                "payment": 0
            };
            props.setStore(newDebtObj);
        } else {
            // demonstrating my bad understanding of state copying/management
            const paymentCopy = (typeof props.store.payment !== "undefined") ? props.store.payment : 0;
            const debtsCopy = props.store.debts;
            props.setStore({
                "debts": debtsCopy.concat(newDebt),
                "payment": paymentCopy
            });
        }
    }

    useEffect(() => {
        if (props.store && typeof props.store.debts !== "undefined") {
            debtInput.current.value = "";
            minPaymentInput.current.value = "";
        }

        if (props.store && typeof props.store.payment !== "undefined") {
            paymentInput.current.value = "";
        }
    }, [props.store]);

	return (
		<div className="debt-payoff-prioritizer__side-panel">
            { introContent() }
            { createDebtEntry() }
            { createPaymentEntry() }
		</div>
	);
}

export default SidePanel;