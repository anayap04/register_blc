// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import Modal from 'react-modal';

expect.extend(toHaveNoViolations);

// Mirrors the Modal.setAppElement call in src/index.js, which doesn't run
// under test since tests import components directly rather than index.js.
Modal.setAppElement(document.body);
