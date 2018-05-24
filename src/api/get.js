import request from 'superagent'
import {
	Message,
	MessageBox
} from 'element-ui'
export default obj => {
	request
		.get('/' + obj.url)
		.query(obj.data)
		.then(function (res) {
			obj.success && obj.success(res.body)
		}).catch(res => {
//			Message.error({
//				title: '错误',
//				message: '网络延迟'
//			});
			obj.fail && obj.fail(res.body)
		})
}
