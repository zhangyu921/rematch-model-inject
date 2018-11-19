/**
 * Created by Basil on 2018/10/8.
 */

import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';

export default models => WrappedComponent => {
  class ModelComponent extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired,
    };
    static displayName = `withModel(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const state = this.context.store.getState();
      for (const m of Object.keys(models)) {
        if (!state[m]) {
          this.context.store.model({ name: m, ...models[m] });
          console.log(`Model injected: ${m}`);
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ModelComponent, WrappedComponent);
};
