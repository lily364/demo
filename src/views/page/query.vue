<template>
  <!--<div style="background-color: #ccc;width: 100%;height: 950px;position: absolute;">-->
  <div class="queryDiv">
    <div class="queryDivCon">
      <page-head></page-head>
      <card class="queryCard" style="margin: auto;">
        <p slot="title" style="text-align: center;font-size: 20px">
          本地查询客户信用报告
        </p>
        <Form ref="formInlines" :label-width="100" :model="formInlines" :rules="ruleInlines">
          <FormItem label="姓名：" style="width: 300px" prop="cfcname">
            <Input v-model="formInlines.cfcname" placeholder="请输入要查询的姓名" clearable></Input>
          </FormItem>

          <FormItem label="证件类型：" prop="idType">
            <Select v-model="formInlines.idType" style="width:200px">
              <Option v-for="item in idType" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItem label="证件号码：" style="width: 300px" prop="cfcId">
            <Input v-model="formInlines.cfcId" placeholder="请输入要查询的证件号码" clearable></Input>
            (15位和18位身份证已整合)
          </FormItem>
          <FormItem label="查询原因：" prop="queryReason">
            <Select v-model="formInlines.queryReason" style="width:200px">
              <Option v-for="item in queryReason" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>

          <FormItem label="本人或配偶：" prop="selfOrSpouse">
            <RadioGroup v-model="formInlines.selfOrSpouse">
              <span @click="handleCloseSelfDiv"><Radio label="1">查询本人</Radio></span>
              <span @click="handleShowSelfDiv"><Radio label="2">查询配偶</Radio></span>
            </RadioGroup>
            <div v-show="selfOrSpouseShow">
              <FormItem prop="selfName">
                <Input v-model="formInlines.selfName" placeholder="请输入客户本人姓名" clearable></Input>
              </FormItem>
              <Divider></Divider>
              <FormItem prop="selfId">
                <Input v-model="formInlines.selfId" placeholder="请输入客户本人身份证号码" clearable></Input>
              </FormItem>
            </div>
          </FormItem>

          <FormItem label="查询类型：" prop="queryType">
            <RadioGroup v-model="formInlines.queryType">
              <Radio label="3">信用报告查询</Radio>
              <Radio label="1">身份信息核查</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="备注查询原因：" prop="queryReason1">
            <RadioGroup v-model="formInlines.LoanOrNext" @on-change="handleLoanDiv">
              <Radio label="1">贷款审批</Radio>
              <Radio label="2">客户再次申请</Radio>
              <Radio label="3">其他</Radio>
            </RadioGroup>
            <div v-show="LoanOrNextShow">
              <Select v-model="formInlines.idLn" style="width:200px" @on-change="changeidLn">
                <Option v-for="item in idLn" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div v-show="queryReason1Show">
              <Input v-model="formInlines.queryReason1" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                     placeholder="请输入备注查询原因" :maxlength="50" style="width: 300px"></Input>
            </div>
          </FormItem>

          <FormItem label="信用报告版式：" prop="verType">
            <RadioGroup v-model="formInlines.verType">
              <Radio label="30">银行版</Radio>
            </RadioGroup>
          </FormItem>

          <FormItem style="margin:0 80px">
            <Button type="primary" shape="circle" @click="handleSubmits('formInlines')">精确查询</Button>
          </FormItem>

        </Form>
      </card>
    </div>
  </div>
</template>

<script>
import PageHead from '../header/pagehead'
import {mapActions} from 'vuex'

export default {
  name: 'query',
  data () {
    // 自定义验证Self用户名
    const validateSelfName = (rule, value, callback) => {
      console.log(this.formInlines.selfOrSpouse)
      if (this.formInlines.selfOrSpouse === '2') {
        console.log('测试一下用户名')
        if (value === '') {
          callback(new Error('请输入正确的姓名，不要为空'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    return {
      selfOrSpouseShow: false,
      LoanOrNextShow: false,
      queryReason1Show: false,
      formInlines: {
        cfcname: '',
        idType: '0',
        cfcId: '',
        queryReason: '01',
        selfOrSpouse: '1',
        LoanOrNext: '2',
        selfName: '',
        selfId: '',
        queryType: '3',
        idLn: '配偶曾因PBOC不良被拒',
        queryReasonLoan:'',
        queryReason1: '',
        verType: '30',
        slider: [20, 50]
      },
      ruleInlines: {
        cfcname: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ],
        cfcId: [
          {required: true, message: '请输入身份证号', trigger: 'blur'},
          {
            pattern: '(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)',
            max: 18,
            message: '请输入正确身份证',
            trigger: 'blur'
          }
        ],
        selfName: [
          {validator: validateSelfName, trigger: 'blur'}
        ]
      },
      idType: [
        {
          value: '0',
          label: '身份证'
        }, {
          value: '1',
          label: '户口簿'
        }, {
          value: '2',
          label: '护照'
        }, {
          value: '3',
          label: '军官证'
        }, {
          value: '4',
          label: '士兵证'
        }, {
          value: '5',
          label: '港澳居民来往内地通行证'
        }, {
          value: '6',
          label: '台湾同胞来往内地通行证'
        }, {
          value: '7',
          label: '临时身份证'
        }, {
          value: '8',
          label: '外国人居留证'
        }, {
          value: '9',
          label: '警官证'
        }, {
          value: 'X',
          label: '其它证件'
        }
      ],
      queryReason: [
        {
          value: '01',
          label: '贷后管理'
        }, {
          value: '02',
          label: '贷款审批'
        }, {
          value: '03',
          label: '信用卡审批'
        }, {
          value: '04',
          label: '本人查询'
        }, {
          value: '05',
          label: '异议查询'
        }, {
          value: '08',
          label: '担保资格审查'
        }, {
          value: '16',
          label: '公积金提取复核'
        }, {
          value: '19',
          label: '特约商户实名审查'
        }, {
          value: '22',
          label: '法人代表、负责人、高管等资信审'
        }, {
          value: '23',
          label: '客户准入资格审查'
        }
      ],
      idLn: [
        {
          value: '1',
          label: '配偶曾因PBOC不良被拒'
        }, {
          value: '2',
          label: '配偶曾因过度负债被拒'
        }, {
          value: '3',
          label: '配偶曾因信用卡透支高拒'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'handleQuery'
    ]),
    handleSubmits (name) {
      this.$refs[name].validate((valid) => {
        // let web = '411322198401070615.html'
        let data = {
          customerName: '张某某',
          certType: '10',
          certNo: '11010819931010444X',
          requestId: 'testcfc',
          requestName: '测试cfc用户',
          authNumber: '0325001',
          queryReason: '01',
          inputUserId: '1007359',
          queryUserId: 'testcfc',
          channel: '36'
        }
        if (valid) {
          console.log('姓名:' + this.formInlines.cfcname)
          // 证件类型
          console.log('证件类型:' + this.formInlines.idType)
          // 证件号码
          console.log('证件号码:' + this.formInlines.cfcId)
          // 查询原因
          console.log('查询原因:' + this.formInlines.queryReason)
          // 本人或配偶
          console.log('本人或配偶:' + this.formInlines.selfOrSpouse)
          // 客户本人信息
          console.log('客户本人信息:' + this.formInlines.selfName)
          console.log('客户本人信息:' + this.formInlines.selfId)
          // 查询类型
          console.log('查询类型:' + this.formInlines.queryType)
          // 备注查询原因
          console.log('备注查询原因:' + this.formInlines.queryReason1)
          // 信用报告板式
          console.log('信用报告板式:' + this.formInlines.verType)
          console.log(this.formInlines.idLn)
          // 验证完开始调用query 来查询结果
          console.log('开始调用')
          this.handleQuery(data).then(res => {
            console.log('调用成功')
            this.$Message.success(res.data.msg)
            console.log('我这个web是什么', res.data.data)
            if (typeof res.data.data === 'undefined') {
              // this.webRoot = 'http://localhost:8090/static/411322198401070615.html'
              this.webRoot = 'http://localhost:8090/#/error404'
            } else {
              let newhttphot = '//159.191.1.88:30138/'
              let oldhttphot = res.data.data
              let s = oldhttphot.replace(/\/\/.+?\//g, newhttphot)
              this.webRoot = s
              console.log(s)
              window.open(s, '_blank')
            }
          }).catch(err => {
            console.log(err)
            if (err.toString().match('Error:')) {
              this.$Message.error('查询失败，接口出现错误，请联系管理员查看原因!')
            } else {
              this.$Message.error(err.response.data.msg)
            }
          })
        } else {
          this.$Message.error('查询失败，请填写完整信息!')
        }
      })
    },
    handleShowSelfDiv () {
      console.log('显示')
      this.selfOrSpouseShow = true
    },
    handleCloseSelfDiv () {
      console.log('测试')
      this.selfOrSpouseShow = false
    },
    handleLoanDiv () {
      console.log(this.formInlines.LoanOrNext)

      if(this.formInlines.LoanOrNext === '1') {
        this.LoanOrNextShow = true
        this.queryReason1Show = false
      }
      if(this.formInlines.LoanOrNext === '2'){
        this.LoanOrNextShow = false
        this.queryReason1Show = false
      }
      if(this.formInlines.LoanOrNext === '3'){
        this.LoanOrNextShow = false
        this.queryReason1Show = true
      }

    },
    changeidLn (id,type) {
      console.log(this.formInlines)


      console.log(this.formInlines.queryReasonLoan)


      // if (this.formInlines.idLn === '4') {
      //   this.formInlines.queryReasonLoan = '';
      // } else {
      //   console.log('走到这里')
      //   this.queryReason1Show = false
      // }
    }
  },
  components: {
    PageHead
  }
}
</script>

<style>
  .queryDiv{
    background-image: linear-gradient(to top,#c4c5c7 0%,#d2dddf 52%,#ebebeb 100%);
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow: auto;
    position: absolute;
  }
  .queryDivCon{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .queryCard {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    /*width: auto;*/
    width: 480px;
    /*height: 650px;*/
    height: auto;
  }

</style>
