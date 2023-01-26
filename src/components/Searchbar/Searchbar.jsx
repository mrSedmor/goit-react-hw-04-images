import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import css from './Searchbar.module.css';

const schema = yup.object().shape({
  query: yup.string().trim().required(),
});

export default function Searchbar({ onSubmit, isSubmitting }) {
  const handleSubmit = ({ query }, { resetForm }) => {
    onSubmit(query.trim().toLowerCase());
    resetForm();
  };

  return (
    <header className={css.searchbar}>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <button type="submit" className={css.button} disabled={isSubmitting}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <Field
            name="query"
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
}

Searchbar.defaultProps = {
  isSubmitting: false,
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};
