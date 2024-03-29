import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text, number } from '@storybook/addon-knobs';

import 'bootstrap/dist/css/bootstrap.css';

import Notifications, { Notification } from '../components/Notifications';

storiesOf('Notifications', module)
  .addDecorator(withKnobs)
  /*
   * usually, I'd generate the parameters for knobs based on prop-types,
   * as TS types are not available at runtime.
   * To generate them, you'd ideally use something like https://github.com/milesj/babel-plugin-typescript-to-proptypes
   * 
   * but in CRA we can't modify the Babel config without ejecting,
   * so we're doing it manually
   */
  .add('the notification', () => (
    <div className="container">
      <Notification
        type={select('type', ['primary', 'danger', 'info', 'warning'], 'primary')}
        message={text('Message', 'A simple primary alert—check it out!')}
        dismissable={boolean('dismissable', false)}
      />
    </div>)
  )
  .add('use notifications', () => {
    const count = number('Amount', 3);
    const message = text('Message', 'foobar');
    const type = select('type', ['primary', 'danger', 'info', 'warning'], 'primary');

    let messages: Notification[] = []
    for (let index = 0; index < count; index++) {
      messages.push({type, message})
      
    }
    
    return (<div className="container">
      <Notifications messages={messages} position={select('Position', ['tl', 'tr', 'bl', 'br'], 'tr')} timeout={number('Timeout', 3000)}/>
    </div>)
  })