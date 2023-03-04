const React = require('react');
const { shallow } = require('enzyme');
const EmployeeDash = require('../sections/employee-dash/EmployeeDash').default;

describe('EmployeeDash component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EmployeeDash />);
  });

  it('should render a start clock button', () => {
    expect(wrapper.find('button').at(0).text()).toEqual('Start Clock');
  });

  it('should start the clock when the start button is clicked', () => {
    const startButton = wrapper.find('button').at(0);
    startButton.simulate('click');
    expect(wrapper.find('p').text()).toContain('Start Time:');
  });

  it('should disable the stop button when the start button has not been clicked', () => {
    const stopButton = wrapper.find('button').at(1);
    expect(stopButton.props().disabled).toEqual(true);
  });

  it('should enable the stop button when the start button has been clicked', () => {
    const startButton = wrapper.find('button').at(0);
    startButton.simulate('click');
    const stopButton = wrapper.find('button').at(1);
    expect(stopButton.props().disabled).toEqual(false);
  });

  it('should not display the stop time until the stop button is clicked', () => {
    const startButton = wrapper.find('button').at(0);
    startButton.simulate('click');
    expect(wrapper.find('p').text()).not.toContain('Stop Time:');
  });

  it('should stop the clock when the stop button is clicked', () => {
    const startButton = wrapper.find('button').at(0);
    startButton.simulate('click');
    const stopButton = wrapper.find('button').at(1);
    stopButton.simulate('click');
    expect(wrapper.find('p').at(1).text()).toContain('Stop Time:');
  });

  it('should render a view monthly report button', () => {
    expect(wrapper.find('button').at(2).text()).toEqual('View Monthly Report');
  });

  it('should not display the monthly report by default', () => {
    expect(wrapper.find('h2')).toHaveLength(0);
  });

  it('should display the monthly report when the view monthly report button is clicked', () => {
    const viewReportButton = wrapper.find('button').at(2);
    viewReportButton.simulate('click');
    expect(wrapper.find('h2').text()).toEqual('Monthly Report');
  });

  it('should allow the user to edit the start time of a day when the Edit Start button is clicked', () => {
    const viewReportButton = wrapper.find('button').at(2);
    viewReportButton.simulate('click');
    const editStartButton = wrapper.find('button').at(3);
    editStartButton.simulate('click');
    expect(JSON.parse(localStorage.getItem('monthlyReport'))[0].hours[0].start).toBeDefined();
  });

  it('should allow the user to edit the stop time of a day when the Edit End button is clicked', () => {
    const viewReportButton = wrapper.find('button').at(2);
    viewReportButton.simulate('click');
    const editEndButton = wrapper.find('button').at(4);
    editEndButton.simulate('click');
    expect(JSON.parse(localStorage.getItem('monthlyReport'))[0].hours[0].end).toBeDefined();
  });
});
