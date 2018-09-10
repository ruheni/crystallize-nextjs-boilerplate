/* eslint react/no-multi-comp: 0, react/no-danger: 0 */
import React from 'react';
import { BasketConsumer } from '@crystallize/react-basket';
import { translate } from 'react-i18next';

import withData from 'lib/with-data';
import Layout from 'cmp/layout';

class Inner extends React.Component {
  state = {
    emptied: false
  };

  componentDidMount() {
    this.empty();
  }

  empty() {
    const { emptied } = this.state;
    const { actions } = this.props;
    if (!emptied) {
      actions.empty();
      this.setState({ emptied: true });
    }
  }

  render() {
    const { order, t } = this.props;

    return (
      <div>
        <h1>Thank you for the purchase!</h1>
        <br />
        <div>
          Order id
          {order.id}
        </div>
        <div>
          Total price incl. tax:
          {t('currency', {
            amount: order.cart.total_price_including_tax / 100
          })}
        </div>
        <div>
          Metadata
          {order.merchant_order_data.comment}
        </div>
        <div dangerouslySetInnerHTML={{ __html: order.gui.snippet }} />
      </div>
    );
  }
}

class CheckoutConfirmation extends React.Component {
  static async getInitialProps(ctx) {
    return { order: ctx.req.crystallizeKlarnaOrder };
  }

  render() {
    const { order } = this.props;
    return (
      <Layout title="confirmation">
        <BasketConsumer>
          {props => <Inner {...props} order={order} />}
        </BasketConsumer>
      </Layout>
    );
  }
}

export default withData(translate()(CheckoutConfirmation));