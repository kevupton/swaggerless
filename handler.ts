import { Application } from './system/app';

export default (event, context, callback) => new Application(event, context, callback);
