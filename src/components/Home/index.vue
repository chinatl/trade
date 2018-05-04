<template>
    <div class="section" v-loading='loading'>
    <div id="app-sider" class="trading-slider">
<!--
        <div class="trading-filter">
            <div class="search"><i class="trading-icon trading-icon-search"></i> <input placeholder="搜索" type="text"></div>
            <div class="drop">
                <p>价格显示:<span>USD</span></p>
                <ul class="drop-box">
                    <li class="active">USD</li>
                    <li class="">CNY</li>
                </ul>
            </div>
        </div>
-->
        <div class="trading-market">
            <div class="trading-tab">
                <ul>
                    <!---->
                    <li role="button" :class=" father_current == index ? 'active' : ''" v-for='(item,index) in father_market' @click='check_father(item,index)'>
                        <img :src="item.markUrl">
                        <p>{{item.vName}}</p>
                    </li>
                </ul>
            </div>
            <div class="market-list">
                <div class=""></div>
                <el-table :data="son_market" fit highlight-current-row
                v-loading='loading'
                class='market' :default-sort="{prop: 'newprice', order: 'descending'}" style="width: 100%;margin-top:20px" @row-click='check_son'>
                    <el-table-column align="center" :label="$t(`ranking['市场']`)" prop='market'>
                        <template slot-scope="scope">
						<span>{{scope.row.vName}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`ranking['最新价']`)" sortable prop='newprice'>
    <template slot-scope="scope">
                                <span>{{scope.row.latestPrize}}</span>
                        </template>
</el-table-column>
<el-table-column align="center" :label="$t(`ranking['涨跌幅']`)" sortable>
    <template slot-scope="scope">
						<span>{{scope.row.roseFall}}</span>
						</template>
</el-table-column>
</el-table>
</div>
</div>
</div>
<div id="app-trade-pro" class="trading-content">
    <div class="trading-count">
        <div class="l-area">
            <div class="current-price">
                <div class="coin-icon"></div>
                <h2>{{ son_ket.vName +'/'+fa_ket.vName}} <span class="text-second trading-greencolor">{{tradeMarketPrize.price }}</span></h2>
                <p>≈ {{ tradeMarketPrize.priceQC }}CNY</p>
            </div>
            <div class="num">24H{{$t(`ranking['涨跌幅']`)}}<br><span class="text-second trading-greencolor">{{tradeMarketPrize.roseFall}}</span></div>
            <div class="num">24H{{$t(`ranking['最高价']`)}}<br><span aria-label="折合:16.977 USD" class="trading-redcolor hint--bottom">{{tradeMarketPrize.maxprize}}</span></div>
            <div class="num">24H{{$t(`ranking['最低价']`)}}<br><span aria-label="折合:15.309 USD" class="trading-greencolor hint--bottom">{{tradeMarketPrize.minprize}}</span></div>
            <div class="num">24H{{$t(`ranking['总价']`)}}<br><span class="trading-darkcolor">
            {{tradeMarketPrize.sumprize}}</span></div>
        </div>
        <div class="r-area"><a role="button" onclick="$('.trading-chart').toggle()" style="margin-right: 15px;">{{$t(`ranking['收起/展开K线']`)}}</a></div>
    </div>
    <div class="trading-chart">
        <!---->
        <div class="chart-area">
            <div class="common-box chart-box">
                <div class="chart-box-head">
                    <div class="l-area">
                        <div class="item">
                            <p :class="current ? 'active' : ''" @click='current = true'>{{$t(`ranking['K线图']`)}}</p>
                        </div>
                        <div class="item">
                            <p :class="!current ? 'active' : ''" @click='current = false'>{{$t(`ranking['深度图']`)}}</p>
                        </div>
                    </div>
                    <div class="r-area">
                        <div class="item arrow">
                            <!--                            <p>价格显示：<span>CNY</span></p>-->
                            <!--
                            <ul class="item-list">
                                <li role="button">默认</li>
                                <li role="button" class="active">USD</li>
                                <li role="button">CNY</li>
                            </ul>
-->
                        </div>
                    </div>
                </div>
                <div class="chart-box-body" v-show='!current'>
                    <chart :options="polar" :style='{width:width+"px"}'></chart>
                </div>
                <div class="chart-box-body" id="chart-box-body" v-show='current'>
                    <!---->
                </div>
            </div>
        </div>
    </div>
    <div class="trading-hotspot">
        <div class="trading-form">
            <div class="form-tab">
                <ul>
                    <li class="active">{{$t(`ranking['限价委托']`)}}</li>
                    <!---->
                </ul>
                <div class="operation">
                    <!--                   <a role="button" class="switch">价格输入转换<i></i></a>-->
                    <!---->
                </div>
            </div>
            <div class="form-lever-panel">
                <!---->
                <!---->
            </div>
            <div class="form-content">
                <div class="box trading-buy">
                    <h2>买入{{son_ket.vName}}</h2>
                    <p class="form-assets">
                        {{$t(`ranking['可用']`)}}{{fa_ket.vName}}：<span aria-label="可买：-- QTUM" class="trading-redcolor hint--top">{{buy_form.money}}</span>
                        <!---->
                        <!---->
                    </p>
                    <!---->
                    <!---->
                    <!---->
                    <div class="form-group">
                        <div class="form-control">
                            <input v-model='buy_form.price' class="buyColor" type='number' @change='check_buy_price'>
                            <label>{{$t(`ranking['买入价']`)}}{{son_ket.vName}}{{$t(`ranking['单价']`)}}({{$t(`ranking['单位']`)}}{{fa_ket.vName}})&nbsp;&nbsp;&nbsp;&nbsp;  {{$t(`ranking['最小值']`)}}： {{buy_form.minBuyPrize}}--
                            {{$t(`ranking['最大值']`)}}{{buy_form.maxBuyPrize}}</label>
                            <!---->
                            <!--                            <span style="margin-right:20px">≈<b class="sellColor">{{buy_form.price * equal}}</b> USD</span>-->
                        </div>
                    </div>
                    <!---->
                    <div class="form-group active">
                        <div class="form-control"><input type="number" @keyup='check_buy_number' v-model='buy_form.number' class="sellColor"> <label>{{$t(`ranking['买入量']`)}}{{son_ket.vName}}{{$t(`ranking['数量']`)}}</label></div>
                        <div class="bk-trans-form">
                        </div>
                    </div>
                    <p class="form-assets">{{$t(`ranking['预计交易额']`)}}：--{{buy_form.price * buy_form.number || ''}}
                        <!--                    <span class="trading-redcolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> {{fa_ket.vName}}-->

                    </p>
                    <p>
                        <el-slider v-model='buy_form.silder' @change='buy_slider'>
                        </el-slider>
                    </p>
                    <!---->
                    <div class="form-button"><button type="button" role="button" class="trading-redbg disabled" v-if='!$store.state.isLogin'><a href='./index#login'>{{$t(`ranking['登录/注册']`)}}</a></button></div>
                    <div class="form-button"><button type="button" role="button" class="trading-redbg disabled" v-if='$store.state.isLogin' @click='buy_bizhong'>{{$t(`ranking['买入']`)}}</button></div>
                </div>
                <div class="box trading-sell">
                    <h2>{{$t(`ranking['卖出']`)}}{{son_ket.vName}}</h2>
                    <p class="form-assets">
                        {{$t(`ranking['可用']`)}}{{son_ket.vName}}：<span aria-label="可卖：-- BTC" class="trading-greencolor hint--top">{{sell_form.money}}</span>
                        <!---->
                        <!---->
                    </p>
                    <!---->
                    <div class="form-group">
                        <div class="form-control">
                            <input type="number" v-model='sell_form.price' @keyup='check_sell_price' class="sellColor"><label>{{$t(`ranking['卖出价']`)}}{{son_ket.vName}}{{$t(`ranking['单价']`)}}({{$t(`ranking['单位']`)}}{{fa_ket.vName}})&nbsp;&nbsp;&nbsp;&nbsp; {{$t(`ranking['最小值']`)}}： {{sell_form.minSellPrize}}--
                            {{$t(`ranking['最大值']`)}}{{sell_form.maxSellPrize}}</label>
                            <!---->
                            <!--                            <span style="margin-right:20px">≈<b class="sellColor">{{sell_form.price * equal}}</b> USD</span>-->
                        </div>
                    </div>
                    <!---->
                    <!---->
                    <!---->
                    <div class="form-group">
                        <div class="form-control">
                            <input type="number" @keyup='check_sell_number' v-model='sell_form.number' class="sellColor">
                            <label>{{$t(`ranking['卖出量']`)}}{{son_ket.vName}}{{$t(`ranking['数量']`)}}</label>
                        </div>
                        <div class="bk-trans-form">
                        </div>
                    </div>
                    <p class="form-assets">{{$t(`ranking['预计交易额']`)}}：--{{sell_form.price * sell_form.number || ''}}
                        <!--                    <span class="trading-greencolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> {{fa_ket.vName}}-->
                    </p>
                    <p>
                        <el-slider  v-model='sell_form.silder' @change='sell_slider'>
                        </el-slider>
                    </p>
                    <!---->
                    <div class="form-button">
                        <button type="button" role="button" class="trading-greenbg disabled" v-if='!$store.state.isLogin'><a href='./index#login'>{{$t(`ranking['登录/注册']`)}}</a></button>
                        <button type="button" role="button" class="trading-greenbg disabled" v-if='$store.state.isLogin' @click='sell_bizhong'>{{$t(`ranking['卖出']`)}}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="trading-disc" assist-price="[object Object]">
            <div class="disc-head">
                <p class="stall"><span>{{$t(`ranking['档位']`)}}</span></p>
                <p><span>{{$t(`ranking['单价']`)}}({{fa_ket.vName}})</span></p>
<!--                <p><span>{{$t(`ranking['折价']`)}}(USD)</span></p>-->
                <p class="last"><span>{{$t(`ranking['总数量']`)}}({{son_ket.vName}})</span></p>
            </div>
            <div class="disc-list">
                <div id="asksDish" class="sell-disc disc-inner" style="touch-action: none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 500ms; <!--transform: translate(0px, -952px) translateZ(0px);-->">
                        <li role="button" v-for='(item,index) in buyData'>
                            <p class="stall trading-greencolor">{{$t(`ranking['卖']`)}}{{index + 1}}</p>
                            <p class="trading-greencolor">{{item. prize}}</p>
                            <p>{{item.amount}}</p>
                            <p class="last">{{item.poolCount}}</p>
                            <p class="progress" style="width: 0.92%;"></p>
                        </li>
                    </ul>
                    <div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
                        <div class="iScrollIndicator" style="transition-duration: 500ms; display: block; height: 19px; transform: translate(0px, 125px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
                    </div>
                </div>
            </div>
            <div class="disc-line"></div>
<!--            <div class="disc-price">-->
                <div class="disc-head">
                <p class="stall"><span>{{$t(`ranking['档位']`)}}</span></p>
                <p><span>{{$t(`ranking['单价']`)}}({{fa_ket.vName}})</span></p>
<!--                <p><span>{{$t(`ranking['折价']`)}}(USD)</span></p>-->
                <p class="last"><span>{{$t(`ranking['总数量']`)}}({{son_ket.vName}})</span></p>
            	</div>
<!--            </div>-->
            <div class="disc-line"></div>
            <div class="disc-list">
                <div id="bidsDish" class="buy-disc disc-inner" style="touch-action: none;">
                    <ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
                        <li role="button" v-for='(item,index) in sellData'>
                            <p class="stall trading-redcolor">{{$t(`ranking['买']`)}}{{index+0}}</p>
                            <p class="trading-redcolor">{{item. prize}}</p>
                            <p>{{item.amount}}</p>
                            <p class="last">{{item.poolCount}}</p>
                            <p class="progress" style="width: 0.92%;"></p>
                        </li>
                    </ul>
                    <div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
                        <div class="iScrollIndicator" style="transition-duration: 0ms; display: block; height: 20px; transform: translate(0px, 0px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="trading-record">
        <div class="entrust-record">
            <div class="current-entrust">
                <div class="entrust-head">
                    <h3>{{$t(`ranking['正在进行的委托']`)}}</h3>
                    <!---->
                </div>
                <div class="record-list">
                    <div class="bk-norecord" style="width:100%;padding:10px;text-align:center">
                        <p v-if='!$store.state.isLogin'><i class="bk-ico info"></i>{{$t(`ranking['您还没有登录']`)}}，{{$t(`ranking['请']`)}} <a href="./index#login" style="color: rgb(222, 33, 29); margin: 0px 5px;">{{$t(`ranking['登录']`)}}</a>{{$t(`ranking['或']`)}} <a href="./index#register" style="color: rgb(61, 193, 142); margin: 0px 5px;">{{$t(`ranking['注册']`)}}</a>{{$t(`ranking['后再尝试']`)}} 。</p>
                        <div v-if='$store.state.isLogin'>
                            <el-table :data="nowingData" border v-loading='nowingloading' stripe style="width: 100%">
                                <el-table-column prop="date" :label="$t(`ranking['时间']`)" align='center' >
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.lastUpdateTime  | parseTime('{y}-{m}-{d}')}}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="name" :label="$t(`ranking['成交总金额']`)+'('+fa_ket.vName +')'" width="180" align='cneter'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.poolCount }}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="name" :label="$t(`ranking['剩余可交易的数量']`)" align='cneter'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.leftAmount }}</span>
                                  </template>
                                </el-table-column>
                                 <el-table-column  label='均价' align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.averagePrize }}</span>
                                  </template>
                                </el-table-column>
                                 <el-table-column  label='已成交折算金额' align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.amount - scope.row.leftAmount }}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="address" label="类型" align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.entrustType ? $t(`ranking['卖出']`) : $t(`ranking['买入']`) }}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="address" :label="$t(`ranking['操作']`)" align='center'>
                                    <template slot-scope="scope">
                                     <el-button type='success' size='mini' @click='cancael(scope.row.id)'>撤销</el-button>
                                  </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="current-entrust">
                <div class="entrust-head">
                    <h3>{{$t(`ranking['历史委托']`)}}</h3>
                    <!---->
                </div>
                <div class="record-list">
                    <div class="bk-norecord" style="width:100%;padding:10px;text-align:center">
                        <p v-if='!$store.state.isLogin'><i class="bk-ico info"></i>{{$t(`ranking['您还没有登录']`)}}，{{$t(`ranking['请']`)}} <a href="./index#login" style="color: rgb(222, 33, 29); margin: 0px 5px;">{{$t(`ranking['登录']`)}}</a>{{$t(`ranking['或']`)}} <a href="./index#register" style="color: rgb(61, 193, 142); margin: 0px 5px;">{{$t(`ranking['注册']`)}}</a>{{$t(`ranking['后再尝试']`)}} 。</p>
                        <div v-if='$store.state.isLogin'>
                            <el-table :data="historyData" border v-loading='historyloading' stripe style="width: 100%">
                                <el-table-column prop="date" :label="$t(`ranking['时间']`)" align='center' width="180">
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.lastUpdateTime  | parseTime('{y}-{m}-{d}')}}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column  :label="$t(`ranking['成交总金额']`)+'('+son_ket.vName +')'" width="180" align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.leftCount }}</span>
                                  </template>
                                </el-table-column> 
							   <el-table-column  label='成交均价' align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.averagePrize }}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="address" label="类型" align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.entrustType ? $t(`ranking['卖出']`) : $t(`ranking['买入']`) }}</span>
                                  </template>
                                </el-table-column>
                                <el-table-column prop="address" label="折算总价" align='center'>
                                    <template slot-scope="scope">
                                    <span>{{ scope.row.poolCount }}</span>
                                  </template>
                                </el-table-column>
                            </el-table>
                               <div class="pagination">
<!--
								<el-pagination
								@current-change="handleCurrentChange"
								:current-page="currentPage4"
								:page-sizes="[5]"
								background
								layout="total, sizes, prev, pager, next, jumper"
								:total="total">
								</el-pagination>
-->
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="newest-record">
            <div class="newest-top">
                <h3>{{$t(`ranking['最新成交']`)}}</h3>
            </div>
            <div class="newest-head">
                <el-table :data="newData" fit highlight-current-row style="width: 100%;margin-top:20px">
                    <el-table-column align="center" :label="$t(`ranking['时间']`)" width='100'>
                        <template slot-scope="scope">
							<span>{{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d}')}}</span>
						</template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t(`ranking['均价']`)">
                        <template slot-scope="scope">
							<span>{{scope.row.averagePrize}}</span>
						</template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t(`ranking['折价']`)">
                        <template slot-scope="scope">
							<span>{{scope.row.poolCount}}</span>
						</template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t(`ranking['交易量']`)">
                        <template slot-scope="scope">
							<span>{{scope.row.amount}}</span>
						</template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
    <!---->
    <!---->
    <!---->
</div>
</div>
</template>
<script>
    import kline_api from '@/config'
    console.log(kline_api, '1')
    import Get from '@/api/get'
    import Post from '@/api/post'
    export default {
        name: 'transaction',
        data() {
            return {
				currentPage4:1,
				total:10,
                loading: false,
                buyData: [], //买入表格
                sellData: [], //买入表格
                newData: [], //最新成交
                current: 1,
                father_current: 0, //定义主市场是哪个
                son_current: 0, //定义子市场是哪个
                tradeMarketPrize: {
                    sumprize: "", //24h总价     
                    maxprize: "", //24h最大价格
                    minprize: "", //24h最小价格	
                    price: "", //24h最小价格	
                    priceQC: "", //24h最小价格	
                },
                equal: 0, //比率
                sixnumer: 6, //限制最小保留次数
                width: null,
                current: true,
                polar: {},
                father_market: [],
                son_market: [],

                son_ket: {
                    bId: '',
                    vName: '',
                },
                fa_ket: {
                    bId: '',
                    vName: ''
                },
                buy_form: {
                    price: '',
                    number: '',
                    money: '',
                    silder: 0,
                    maxBuyPrize: '',
                    minBuyPrize: '',
                },
                sell_form: {
                    price: '',
                    number: '',
                    money: '',
                    silder: 0,
                    maxSellPrize: '',
                    minSellPrize: '',
                },
                historyData: [],
                nowingData: [],
                nowingloading: false,
                historyloading: false,
                kline: null
            }
        },
        watch: {
            'deepData': res => {
                console.log(res)

            }
        },
        created() {
            this.$sock.connect({}, frame => {
                this.$sock.send("/app/sendBuy", {}, JSON.stringify({
                    "symbol": 'BTC_QC'
                }));
                this.$sock.send("/app/sendSell", {}, JSON.stringify({
                    "symbol": 'BTC_QC'
                }));
                this.$sock.send("/app/sendDepth", {}, JSON.stringify({
                    "symbol": 'BTC_QC'
                }));
                this.$sock.send("/app/sendNewest", {}, JSON.stringify({
                    "symbol": 'BTC_QC'
                }));
                this.$sock.send("/app/sendKline", {}, JSON.stringify({
                    "symbol": 'BTC_QC'
                }));
                this.$sock.subscribe(`/topic/subscribeBuy`, data => {
                    if (JSON.parse(data.body) + '' === 'null') {
                        return
                    }
                    this.buyData = JSON.parse(data.body);
                }) /*买出的数据*/
                this.$sock.subscribe(`/topic/subscribeSell`, data => {
                    if (JSON.parse(data.body) + '' === 'null') {
                        return
                    }
                    this.sellData = JSON.parse(data.body);
                }) /*买出的数据*/
                this.$sock.subscribe(`/topic/subscribeNewest`, data => {
                    if (JSON.parse(data.body) + '' === 'null') {
                        return
                    }
                    this.newData = JSON.parse(data.body);
                }) /*买出的数据*/

                this.$sock.subscribe(`/topic/subscribeDepth`, data => {
                    if (JSON.parse(data.body) + '' === 'null') {
                        return
                    }
                    var res = this.getDeepData(JSON.parse(data.body));
                    this.polar = {
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: '#F7F7F7',
                            textStyle: {

                                color: '#000'
                            },
                            borderWidth: '2',
                            borderColor: 'rgba(0,0,0,.4)'
                            //				position: function(pt) {
                            //					return [pt[0], '10%'];
                            //				}
                        },
                        grid: {
                            left: '2%',
                            right: '2%',
                            bottom: '2%',
                            top: '2%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                dataZoom: {
                                    yAxisIndex: 'none'
                                },
                                restore: {},
                                saveAsImage: {}
                            }
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: false,
                            splitLine: {
                                show: false
                            }
                        },
                        yAxis: {
                            type: 'value',
                            boundaryGap: [0, '100%'],
                            axisLine: {
                                show: true
                            },
                            axisLabel: {
                                show: true
                            }
                        },
                        series: [{
                            name: '买单',
                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#E65855'
                                }
                            },
                            lineStyle: {
                                color: '#E65855',
                                width: 3
                            },
                            areaStyle: {},
                            data: res.asks.map(function(e) {
                                return [e[1], e[0]]
                            })
                        }, {
                            name: '实收',
                            type: 'line',
                            smooth: true,
                            showSymbol: false,
                            sampling: 'average',
                            itemStyle: {
                                normal: {
                                    color: '#64D694'
                                },

                            },
                            lineStyle: {
                                color: '#64D694',
                                width: 3
                            },
                            //				symbolSize: 12,
                            //				symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
                            //				markPoint: {
                            //					label: {
                            //						normal: {
                            //							fontSize: 16
                            //						}
                            //					},
                            //					itemStyle: {
                            //						normal: {
                            //							color: '#ccc',
                            //						}
                            //					}
                            //				},
                            areaStyle: {},
                            data: res.bids.map(function(e) {
                                return [e[1], e[0]]
                            })
                        }]
                    };
                }) /*深度图的数据*/
            })
            this.width = screen.availWidth - 350 - 20;
            Get({
                url: 'basisMarket/selBasisMarket',
                success: res => {
                    if (res.code === 0) {
                        this.father_market = res.data;
                        this.fa_ket = res.data[0];
                        this.selcurrencyManage(this.fa_ket);
                    }
                }
            })
        },
        methods: {
			handleCurrentChange(){
				
			},
            cancael(id) {
                this.loading = true;
                Get({
                    url: 'pool/revocationPool',
                    data: {
                        id: id
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.$message({
                                message: '撤销成功',
                                type: 'success',
                                duration: 5000
                            });
                            this.selPool(this.son_ket.vName + '_' + this.fa_ket.vName)
                        } else {
                            this.$message({
                                message: '撤销失败',
                                type: 'error',
                                duration: 5000
                            });
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            buy_slider(e) {
                this.buy_form.number = this.buy_form.money * e / 100;
            },
            sell_slider(e) {
                this.sell_form.number = this.sell_form.money * e / 100;
            },
            buy_bizhong() {
                if (this.buy_form.price === '' || this.buy_form.number === '') {
                    this.$message({
                        message: '内容不完整',
                        type: 'warning',
                        duration: 2000
                    });
                    return
                }
                this.loading = true;
                Post({
                    url: 'pool/addBuyPool',
                    data: {
                        tradeMarket: this.son_ket.vName + '_' + this.fa_ket.vName,
                        entrustType: 0,
                        prize: this.buy_form.price,
                        amount: this.buy_form.number,
                        currId: this.son_ket.vId,
                        basisId: this.fa_ket.bId,
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.$message({
                                message: '买入成功',
                                type: 'success',
                                duration: 5000
                            });
                        } else {
                            this.$message({
                                message: res.data,
                                type: 'error',
                                duration: 5000
                            });
                        }
                    }
                })
            },
            sell_bizhong() {
                if (this.sell_form.price === '' || this.sell_form.number === '') {
                    this.$message({
                        message: '内容不完整',
                        type: 'warning',
                        duration: 2000
                    });
                    return
                }
                this.loading = true;
                Post({
                    url: 'pool/addSellPool',
                    data: {
                        tradeMarket: this.son_ket.vName + '_' + this.fa_ket.vName,
                        entrustType: 0,
                        prize: this.sell_form.price,
                        amount: this.sell_form.number,
                        currId: this.son_ket.vId,
                        basisId: this.fa_ket.bId,
                    },
                    success: res => {
                        this.loading = false;

                        if (res.code === 0) {
                            this.$message({
                                message: '买入成功',
                                type: 'success',
                                during: 5000
                            });
                        } else {
                            this.$message({
                                message: res.data,
                                type: 'error',
                            });
                        }
                    }
                })
            },
            check_buy_price() {
                var v = this.buy_form.price;
                var max = this.buy_form.maxBuyPrize;
                var min = this.buy_form.minBuyPrize;
                var number = this.sixnumber;
                if (v - 0) {
                    var x = (v - 0).toFixed(number) - 0;
                    this.buy_form.price = x;
                }
                if (v > max) {
                    this.buy_form.price = max;
                    this.$message({
                        message: '请输入价格以内的数',
                        type: 'error'
                    });
                    return
                };
                if (v < min) {
                    this.buy_form.price = min;
                    this.$message({
                        message: '请输入价格以内的数',
                        type: 'error'
                    });
                    return
                }

            },
            check_buy_number() {
                var v = this.buy_form.number;
                var max = this.buy_form.maxBuyPrize;
                var min = this.buy_form.minBuyPrize;
                var number = this.sixnumber;
                if (v - 0) {
                    var x = (v - 0).toFixed(number) - 0;
                    this.buy_form.number = x;
                }
                if (v * this.buy_form.price > this.buy_form.money) {
                    this.$message({
                        message: '可用余额不足',
                        type: 'error'
                    });
                    this.buy_form.number = this.buy_form.money / this.buy_form.price
                    return
                }
                //                if (v > max) {
                //                    this.buy_form.price = max;
                //                    this.$message({
                //                        message: '请输入价格以内的数',
                //                        type: 'error'
                //                    });
                //                    return
                //                }
            },
            check_sell_number() {
                var v = this.sell_form.number;
                var max = this.sell_form.maxBuyPrize;
                var min = this.sell_form.minBuyPrize;
                var number = this.sixnumber;
                if (v - 0) {
                    var x = (v - 0).toFixed(number) - 0;
                    this.sell_form.number = x;
                }
                if (v > this.sell_form.money) {
                    this.$message({
                        message: '可用数量不足',
                        type: 'error'
                    });
                    this.sell_form.number = this.sell_form.money / this.sell_form.price
                    return
                }
            },
            check_sell_price() {
                var v = this.sell_form.price;
                var max = this.sell_form.maxSellPrize;
                var min = this.sell_form.minSellPrize;
                var number = this.sixnumber;
                if (v - 0) {
                    var x = (v - 0).toFixed(number) - 0;
                    this.sell_form.price = x;
                }
                if (v > max) {
                    this.sell_form.price = max;
                    this.$message({
                        message: '请输入价格以内的数',
                        type: 'error'
                    });
                    return
                }
                if (v < min) {
                    this.sell_form.price = min;
                    this.$message({
                        message: '请输入价格以内的数',
                        type: 'error'
                    });
                    return
                }
            },
            /**/
            getDeepData(arr) {
                var obj = {
                    asks: [],
                    bids: [],
                }
                for (var i = 0; i < arr.length; i++) {
                    obj.asks[i] = [arr[i].buyPrice, arr[i].buyVolume]
                    obj.bids[i] = [arr[i].sellPrice, arr[i].sellVolume]
                }
                return obj
            },
            /*切换父市场*/
            check_father(item, index) {
                this.father_current = index;
                this.fa_ket = item;
                this.selcurrencyManage(item);
            },
            /*切换子市场*/
            check_son(raw) {
                this.kline.setSymbol(raw.vName, 'USD/BTC');
                this.son_ket = Object.assign({}, raw);
                this.son_ket.vName = this.son_ket.vName.split('_')[0]
                this.findprize(raw);
                this.findNewPrice(raw);
                this.findNewPriceBuVirtual(raw);
                this.findUser(raw);
                this.selPool(raw)
                //                this.selAmountMoney(raw)
            },
            /*根据币种id查询当前用户钱包:*/
            findUser(item) {
                Get({
                    url: 'pool/findUserVirtualCoinNum',
                    data: {
                        id: item.vId
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.sell_form.money = res.data.vTotal;
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
                Get({
                    url: 'pool/findUserVirtualCoinNum',
                    data: {
                        id: this.fa_ket.vId
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.buy_form.money = res.data.vTotal;
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            /*根据交易市场查询最新交易价格*/
            findNewPrice(item) {
                Post({
                    url: 'basisMarket/findNewPrice',
                    data: {
                        name: item.vName
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.tradeMarketPrize.price = res.data.price;
                            this.tradeMarketPrize.priceQC = res.data.priceQC;
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            /*根据币种名称查询最新交易价格*/
            findNewPriceBuVirtual(item) {
                Post({
                    url: 'basisMarket/findNewPriceBuVirtual',
                    data: {
                        name: item.vName
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.equal = res.data.price;
                            this.sixnumber = res.data.decimalPlaces;
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            /*查询子市场*/
            selcurrencyManage(obj) {
                this.loading = true;
                Get({
                    url: 'basisMarket/selcurrencyManage',
                    data: {
                        bId: obj.bId,
                        vName: obj.vName,
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.son_market = res.data;
                            this.son_ket = Object.assign({}, res.data[0]);
                            this.son_ket.vName = this.son_ket.vName.split('_')[0]
                            this.findprize(res.data[0]);
                            this.findNewPrice(res.data[0]);
                            this.findNewPriceBuVirtual(res.data[0]);
                            this.findUser(res.data[0]);
                            this.selCurrencyTraedSum(res.data[0]);
                            this.selPool(res.data[0])
                            this.kline.setSymbol(res.data[0].vName, 'USD/BTC');
                            //                            this.selAmountMoney(res.data[0])
                        } else {
                            this.$message({
                                message: res.data,
                                type: 'error'
                            })
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            /*新增稳妥*/
            selAmount() {
                Post({
                    url: 'pool/addPool',
                    data: {
                        tradeMarket: "",
                        entrustType: '',
                        prize: "",
                        amount: ''
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {}
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            /*价格交易限制*/
            selCurrencyTraedSum(item) {
                Get({
                    url: 'pool/findVManage',
                    data: {
                        currId: item.vId,
                        basisId: this.fa_ket.bId,
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.buy_form.maxBuyPrize = res.data.maxBuyPrize;
                            this.buy_form.minBuyPrize = res.data.minBuyPrize;
                            this.sell_form.maxSellPrize = res.data.maxSellPrize;
                            this.sell_form.minSellPrize = res.data.minSellPrize;
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            },
            /*历史订单*/
            selPool(item) {
                this.nowingloading = true;
                this.historyloading = true;
                Get({
                    url: 'pool/selPool',
                    data: {
                        teadeMarket: item.vName,
                        pageNo: 1,
                        pageSize: 5,
                        lishi: '1'
                    }, //
                    success: res => {
                        this.nowingloading = false;
                        if (res.code === 0) {
                            this.nowingData = res.data
							console.log(res.data);
                        }
                    },
                    fail: res => {
                        this.nowingloading = false;
                    }
                });
                Get({
                    url: 'pool/selPool',
                    data: {
                        teadeMarket: item.vName,
                        pageNo: 1,
                        pageSize: 5,
                        lishi: ''
                    }, //历史
                    success: res => {
                        this.historyloading = false;
                        if (res.code === 0) {
                            this.historyData = res.data;
							console.log(res.data);
                        }
                    },
                    fail: res => {
                        this.historyloading = false;
                    }
                })
            },
            /*涨跌幅*/
            findprize(item) {
                this.tradeMarketPrize.roseFall = item.roseFall;
                Get({
                    url: 'basisMarket/findprize',
                    data: {
                        tradeMarket: item.vName
                    },
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.tradeMarketPrize.sumprize = res.data.sumprize;
                            this.tradeMarketPrize.maxprize = res.data.maxprize;
                            this.tradeMarketPrize.minprize = res.data.minprize;
                        }
                    },
                    fail: res => {
                        this.loading = false;
                    }
                })
            }
        },
        mounted() {
            this.kline = new Kline({
                element: "#chart-box-body",
                width: $('.trading-chart').width(),
                height: 400,
                theme: 'light', // light/dark
                language: 'zh-cn', // zh-cn/en-us/zh-tw
                ranges: ["1d", "1h", "30m", "15m", "5m", "1m", "line"],
                //                ranges: ["15m"],
                symbol: this.son_ket.vName + '_' + this.fa_ket.vName,
                symbolName: 'BTC_SC',
                type: "poll", // 
                limit: 1000,
                intervalTime: 5000,
                showTrade: false,
                debug: false,
                url: kline_api + 'webSocketServer',
                subscribePath: "/topic/subscribeKline",
                sendPath: "/app/sendKline",
                enableSockjs: false,
                debug: false,
                disableFirebase: true
            });
            this.kline.draw();
        },

    }

</script>

<style>
    @import '../../assets/transaction.css';
    .section {
        display: flex;
        width: 100%;
    }

    .market .has-gutter {
        font-size: 12px;
        font-weight: bold
    }

    .market .el-table__row .cell span {
        font-size: 12px;
        white-space: nowrap;
    }

    .newest-head .has-gutter .el-table td,
    .newest-head .has-gutter .el-table th {
        padding: 4px;
    }

    .newest-head .has-gutter {
        font-size: 12px;
        font-weight: bold
    }

    .newest-head tbody {
        font-size: 12px;
        white-space: nowrap;
    }

    .el-table td,
    .el-table th {
        padding: 4px 0;
    }

    .el-table td span,
    .el-table th span {
        white-space: nowrap;
    }

    .el-table--scrollable-x .el-table__body-wrapper {
        overflow-x: hidden;
    }

    .echarts {
        height: 422px;
    }

    .trading-content {
        border-left: 1px solid #ccc
    }

</style>
