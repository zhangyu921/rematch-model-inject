/**
 * Created by Basil on 2018/10/8.
 */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
export default (models => WrappedComponent => {
  class ModelComponent extends React.Component {
    componentWillMount() {
      const state = this.context.store.getState();

      for (const m of Object.keys(models)) {
        if (!state[m]) {
          this.context.store.model({
            name: m,
            ...models[m]
          });
          console.log(`Model injected: ${m}`);
        }
      }
    }

    render() {
      return React.createElement(WrappedComponent, this.props);
    }

  }

  ModelComponent.WrappedComponent = WrappedComponent;
  ModelComponent.contextTypes = {
    store: PropTypes.object.isRequired
  };
  ModelComponent.displayName = `withModel(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return hoistNonReactStatics(ModelComponent, WrappedComponent);
});