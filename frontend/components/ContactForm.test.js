import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
    render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i)
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent("Contact Form")
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i)
    userEvent.type(firstName, "jaso")
    const error = await screen.findAllByTestId("error");
    expect(error).toHaveLength(1)
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const button = screen.getAllByRole("button");
    userEvent.click(button[0]);
    const errors = await screen.findAllByTestId("error");
    expect(errors).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />)
    const first = screen.getByLabelText(/first name/i);
    const last = screen.getByLabelText(/last name/i);
    userEvent.type(first, 'jason')
    userEvent.type(last, 'decker')
    const button = screen.getByRole("button");
    userEvent.click(button)
    
    const error = await screen.findAllByTestId("error");
    expect(error).toHaveLength(1)

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />)
    const first = screen.getByLabelText(/first name/i);
    const last = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i)
    userEvent.type(first, 'jason')
    userEvent.type(last, 'decker')
    userEvent.type(email, 'jjjjjj')
    const button = screen.getByRole("button");
    userEvent.click(button)

    const error = await screen.findAllByTestId("error");
    console.log(error)
    
    expect(error[0]).toHaveTextContent("email must be a valid email address")
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)
    
    const first = screen.getByLabelText(/first name/i);
    const email = screen.getByLabelText(/email/i)
    userEvent.type(first, 'jason')
    userEvent.type(email, 'jdecker118@gmail.com')
    const button = screen.getByRole("button");
    userEvent.click(button)

    const error = await screen.findAllByTestId("error");
    expect(error[0]).toHaveTextContent("lastName is a required field")
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />)
    
    const first = screen.getByLabelText(/first name/i);
    const last = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i)
    userEvent.type(first, 'jason')
    userEvent.type(last, 'decker')
    userEvent.type(email, 'jdecker117@gmail.com')
    const button = screen.getByRole("button");
    userEvent.click(button);

    const firstEntry = screen.getByTestId("firstnameDisplay")
    const lastEntry = screen.getByTestId("lastnameDisplay")
    const emailEntry = screen.getByTestId("emailDisplay")
    const message = screen.queryByTestId("messageDisplay")

    expect(firstEntry).toBeInTheDocument();
    expect(lastEntry).toBeInTheDocument();
    expect(emailEntry).toBeInTheDocument();
    expect(message).not.toBeInTheDocument();

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    
    const first = screen.getByLabelText(/first name/i);
    const last = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i)
    const message = screen.getByLabelText(/message/i)
    userEvent.type(first, 'jason')
    userEvent.type(last, 'decker')
    userEvent.type(email, 'jdecker117@gmail.com')
    userEvent.type(message, 'Hello World')
    const button = screen.getByRole("button");
    userEvent.click(button);

    const firstEntry = screen.getByTestId("firstnameDisplay")
    const lastEntry = screen.getByTestId("lastnameDisplay")
    const emailEntry = screen.getByTestId("emailDisplay")
    const messageEntry = screen.queryByTestId("messageDisplay")

    expect(firstEntry).toBeInTheDocument();
    expect(lastEntry).toBeInTheDocument();
    expect(emailEntry).toBeInTheDocument();
    expect(messageEntry).toBeInTheDocument();
});
