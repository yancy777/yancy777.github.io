/**
 * ele : ��Ҫ����¼���Ԫ��
 * eventtype : �¼������ͣ��ַ���������on��
 * fun : Ҫ�󶨵ĺ���
 * isCapture : �Ƿ񲶻�true������false����ð��
 * ������
 */
function addEvent(ele, eventtype, fun, isCapture) {
	if(ele.attachEvent) {
		ele.attachEvent("on"+eventtype, fun);
	} else {
		ele.addEventListener(eventtype, fun, isCapture);
	}
}