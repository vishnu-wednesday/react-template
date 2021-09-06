// eslint-disable-next-line
import PropTypes from 'prop-types';

/**
 * Component for conditional rendering
 *
 */

const If = (props) => (props.condition ? props.children : props.otherwise);
If.propTypes = {
  /**
   * @type boolean
   * condition to check
   */
  condition: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * @type ReactNode
   * to render if condition is false
   */
  otherwise: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /**
   * @type ReactElement
   * children to render if conditon is true
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
If.defaultProps = {
  otherwise: null
};
export default If;
