import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Mars } from './Mars';

describe('Mars tests', () => {
  it('should render without errors', () => {
    expect(
      toJson(
        shallow(<Mars outputMovements="" getOutputMovements={jest.fn()} />)
      )
    ).toMatchSnapshot();
  });

  it('should display user input', () => {
    const wrapper = shallow(
      <Mars outputMovements="" getOutputMovements={jest.fn()} />
    );
    let instructionInputComponent = wrapper.find('.instruction-input');

    expect(instructionInputComponent.text()).toEqual('');

    instructionInputComponent.simulate('change', { target: { value: 'xyz' } });
    instructionInputComponent = wrapper.find('.instruction-input');

    expect(instructionInputComponent.html().includes('xyz')).toBeTruthy();
  });

  it('should call output api', () => {
    const getOutputMovements = jest.fn();
    const wrapper = shallow(
      <Mars outputMovements="" getOutputMovements={getOutputMovements} />
    );
    wrapper.find('button').simulate('click');

    expect(getOutputMovements).toHaveBeenCalledTimes(1);
  });

  it('should display output error', () => {
    const wrapperWithoutError = shallow(
      <Mars outputMovements="" getOutputMovements={jest.fn()} />
    );

    const wrapperWithError = shallow(
      <Mars
        outputMovements=""
        outputMovementsError="error"
        getOutputMovements={jest.fn()}
      />
    );

    let outputErrorComponent = wrapperWithoutError.find('.output-error');

    expect(outputErrorComponent.exists()).toBeFalsy();

    outputErrorComponent = wrapperWithError.find('.output-error');

    expect(outputErrorComponent.exists()).toBeTruthy();
    expect(outputErrorComponent.text()).toEqual('error');
  });
});
