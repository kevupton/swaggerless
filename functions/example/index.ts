/**
 * Serverless Function
 *
 * @param event
 * @param context
 * @param callback
 */
export function example (event, context, callback) {
  if (event.body.isSuccess) {
    callback(null, 'Some success message');
  }
  else {
    callback('Some error message');
  }
}