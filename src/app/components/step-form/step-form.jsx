import React from 'react';
import getClass from '../../utils/getClass';

const StepForm = (props) => {
    const { title, children } = props;

    return (
        <div className={getClass("step-form", props)}>
            <h1 className="step-form__title title">
                {title}
            </h1>
            {children}
        </div>
    );
};

export default StepForm;
