import PropTypes from 'prop-types';
import s from './Section.module.css';

function Section({ title, children }) {
  return (
    <div className={s.contanier}>
      <h2 className={s.title}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
Section.propTypes = {
  title: PropTypes.string.isRequired,
  //   children: PropTypes.element.isRequired,
};
export default Section;
