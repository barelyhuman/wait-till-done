import { css } from "goober";

// TODO
const theme = {};

export const styles = {
  button: css`
    background: transparent;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #868e96;
    color: #495057;
    outline: none;

    &:hover {
      color: #212529;
      cursor: pointer;
      border-color: #212529;
    }
  `,
  textField: css`
    width: 100%;
    background: transparent;
    padding: 10px;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    outline: none;
  `,
  baseContainer: css`
    padding: 1rem;
    font-size: 14px;
    max-width: 900px;
    color: #495057;
    margin: 0 auto;
  `,
};
