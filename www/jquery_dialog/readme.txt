jquery.js, class.js��ϵͳ���Ѿ����ڣ�
ֻ��ҪǶ��jquery.event.drag.js, maildialog.js�ļ�������Ҫ��ص�css��image����images�ļ����У�
jquery.event.drag.js: һ��jQuery�ĵ�������չ�������˴��������ק���ܣ��������Ҫʵ����ק���Բ�Ƕ������ļ���


�ӿڵ��÷�ʽ

/*
title: String   // �Ի���ı�������
info: String    // �Ի���������Ϣ
click: Function // �����ȷ������ť��Ӧ���¼���ģ��ϵͳdialog�Ի��������״̬��
����Ĭ�϶����Բ���
*/
mailDialog.alert({
	title: 'alert��ʾ�Ի���',
	info: '��Ĳ������������²���',
	click: function(event) {
		// something code here
	}
});

/*
title: String   // �Ի���ı�������
info: String    // �Ի���������Ϣ
confirm: String // ��ȷ������ť������������Ĭ���ǡ�ȷ������
cancel: String  // ��ȡ������ť������������Ĭ���ǡ�ȡ������
click: Function // �����ȷ������ť��Ӧ���¼���ģ��ϵͳdialog�Ի��������״̬��
cancelclick: Function // �����ȡ������ť��Ӧ���¼�
����Ĭ�϶����Բ���
*/
mailDialog.confirm({
	title: 'confirm��ʾ�Ի���',
	info: 'ȷ��Ҫ����������',
	confirm: 'Yes',
	cancel: 'No',
	click: function(event) {
		// something code here
	},
	cancelclick: function(event) {
		// something code here
	}
});

/*
title: String   // �Ի���ı�������
info: String    // �Ի���������Ϣ
prompt: String  // ������е�������Ϣ
click: Function // �����ȷ������ť��Ӧ���¼���ģ��ϵͳdialog�Ի��������״̬��
cancelclick: Function // �����ȡ������ť��Ӧ���¼�
����Ĭ�϶����Բ���
*/
mailDialog.prompt({
	title: 'prompt��ʾ�Ի���',
	info: '���������ݣ�',
	prompt: 'test value',
	// value: �����prompt���� ==��'test value'
	click: function(value, event) {
		// something code here
	},
	cancelclick: function(value, event) {
		// something code here
	}
});