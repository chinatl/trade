<template>
<div class="section" v-loading='loading'>
	<div id="app-sider" class="trading-slider">
		
        <div class="trading-filter">
            <div class="search"><i class="trading-icon trading-icon-search"></i> <input :placeholder="$t(`other['搜索']`)" type="text" v-model='son_value' @keyup='change_son_value'></div>
<!--
            <div class="drop">
                <p>价格显示:<span>USD</span></p>
                <ul class="drop-box">
                    <li class="active">USD</li>
                    <li class="">CNY</li>
                </ul>
            </div>
-->
        </div>

		<div class="trading-market">
			<div class="trading-tab">
				<ul>
					<!---->

					<li role="button" :class=" father_current == index ? 'active' : ''" v-for='(item,index) in father_market' @click='check_father(item,index)'>
						<img :src="item.markUrl">
						<p>{{item.vName}}</p>
					</li>
					<li role="button" :class=" father_current == 100 ? 'active' : ''" @click='check_father("我的")'>
						<i class="el-icon-star-on" style='font-size:16px'></i>
						<p>{{$t('other["自选"]')}}</p>
					</li>
				</ul>
			</div>
			<div class="market-list">
				<div class=""></div>
				<el-table :data="son_market" fit highlight-current-row v-loading='loading' class='market' style="width: 100%;margin-top:20px" @row-click='check_son'>
					<el-table-column width='50'>
						<template slot-scope="scope">
								<span style="color:rgb(247, 186, 42);font-size:16px;cursor:pointer" @click='add_my(scope.row,scope.$index)'>
									<i class='el-icon-star-on' v-show='showstart(scope.$index)'></i>
									<i class='el-icon-star-off' v-show='!showstart(scope.$index)'></i>
								</span>
						</template>
</el-table-column>
<el-table-column :label="$t(`ranking['市场']`)" prop='market' width='120'>
	<template slot-scope="scope">
						<span><img :src="scope.row.markUrl" alt="" style='width:20px;vertical-align:top;margin-right:10px' >{{scope.row.vName.split('_')[0] +'/' + fa_ket.vName}}</span>
	</template>
</el-table-column>
<el-table-column :label="$t(`ranking['最新价']`)+fa_ket.vName" sortable prop='newprice' width='120'>
	<template slot-scope="scope">
								<span v-show='!show_price' :style="{color: scope.row.roseFall < 0 ? '#30c296':'#fd315b'}">{{scope.row.latestPrize}}</span>
								<span v-show='show_price' :style="{color: scope.row.roseFall < 0 ? '#30c296':'#fd315b'}">{{scope.row.cardinal1_3}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`ranking['涨跌幅']`)" sortable>
	<template slot-scope="scope">
							<span :style="{color: scope.row.roseFall < 0 ? '#30c296':'#fd315b'}">
							<span v-show='scope.row.roseFall'>{{ (scope.row.roseFall >= 0 ? "+" :'')}}</span>
							{{scope.row.roseFall && scope.row.roseFall.toFixed(2) + ' %'}} </span>
						</template>
</el-table-column>
</el-table>
</div>
</div>
</div>
<div id="app-trade-pro" class="trading-content">
	<div class="trading-count" :style='{width:width+"px"}'>
		<div class="l-area">
			<div class="current-price">
				<div class="coin-icon"><img :src="son_img" alt="" style='width:20px;vertical-align:top;margin-right:10px'></div>
				<h2>{{ son_ket.vName }} / <span>{{fa_ket.vName}}</span> <span :class=" tradeMarketPrize.roseFall < 0 ? 'text-second trading-greencolor': 'text-second trading-redcolor'">{{NewPrize.toFixed(sixnumber)}}</span></h2>
				<p>≈ {{ NewCount.toFixed(sixnumber)}}CNY</p>
			</div>
			<div class="num">24H{{$t(`ranking['涨跌幅']`)}}<br>
				<span :class=" tradeMarketPrize.roseFall < 0 ? 'text-second trading-greencolor': 'text-second trading-redcolor'">{{tradeMarketPrize.roseFall && tradeMarketPrize.roseFall.toFixed(sixnumber)}}</span>
			</div>
			<div class="num">24H{{$t(`ranking['最高价']`)}}<br><span aria-label="折合:16.977 USD" class="trading-redcolor hint--bottom">{{tradeMarketPrize.maxprize}}</span></div>
			<div class="num">24H{{$t(`ranking['最低价']`)}}<br><span aria-label="折合:15.309 USD" class="trading-greencolor hint--bottom">{{tradeMarketPrize.minprize}}</span></div>
			<div class="num">24H{{$t(`ranking['总价']`)}}<br><span class="trading-darkcolor">
            {{tradeMarketPrize.sumprize && tradeMarketPrize.sumprize.toFixed(sixnumber) }}{{son_ket.vName}}</span></div>
		</div>
		<div class="r-area"><a role="button" onclick="$('.trading-chart').toggle()" style="margin-right: 15px;">{{$t(`ranking['收起/展开K线']`)}}</a></div>
	</div>
	<div class="trading-chart" :style='{width:width+"px"}'>
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
	<div class="trading-hotspot" :style='{width:width+"px"}'>
		<div class="trading-form">
			<div class="form-tab">
				<ul>
					<li class="active">{{$t(`ranking['限价委托']`)}}</li>
					<!---->
				</ul>
				<div class="operation">
					<a role="button" class="switch">{{$t('other["价格输入转换"]')}}<el-switch v-model="show_price" style='margin-left:10px' @change='shuruzhuanhuan'></el-switch></a>

					<!---->
				</div>
			</div>
			<div class="form-lever-panel">
				<!---->
				<!---->
			</div>
			<div class="form-content">
				<div class="box trading-buy" v-loading='buy_loading'>
					<h2>买入{{son_ket.vName}}</h2>
					<p class="form-assets">
						{{$t(`ranking['可用']`)}}{{fa_ket.vName}}：<span aria-label="可买：-- QTUM" class="trading-redcolor hint--top">{{buy_form.money * yaochengdeshu}}</span>
						<span style="margin-left:20px"></span>{{$t('other["冻结"]')}}{{fa_ket.vName}}：<span aria-label="可买：-- QTUM" class="trading-redcolor hint--top">{{buy_form.frozenTotal * yaochengdeshu}}</span>
						<!---->
						<!---->
					</p>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control">
							<input v-model='buy_form.price' class="buyColor" @change='check_buy_price' @keyup='check_buy_price' :disabled='!$store.state.isLogin'>
							<label>{{$t(`ranking['买入价']`)}}{{son_ket.vName}}{{$t(`ranking['单价']`)}}({{$t(`ranking['单位']`)}}{{show_price ? 'CNY' : fa_ket.vName }} )&nbsp;&nbsp;&nbsp;&nbsp;  {{$t(`ranking['最小值']`)}}： {{buy_form.minBuyPrize}}--
                            {{$t(`ranking['最大值']`)}}{{buy_form.maxBuyPrize}}</label>
							<!---->
							<span style="margin-right:20px">≈<b class="sellColor">{{ !show_price ? buy_form.price / cardinal1_3 : buy_form.price * cardinal1_3 }}</b> {{!show_price ? 'CNY' : fa_ket.vName }} </span>
						</div>
					</div>
					<!---->
					<div class="form-group active">
						<div class="form-control"><input type="text" @keyup='check_buy_number' v-model='buy_form.number' :disabled='!$store.state.isLogin' class="sellColor"> <label>{{$t(`ranking['买入量']`)}}{{son_ket.vName}}{{$t(`ranking['数量']`)}}</label></div>
						<div class="bk-trans-form">
						</div>
					</div>
					<p class="form-assets">{{$t(`ranking['预计交易额']`)}}：{{ (buy_form.price * buy_form.number).toFixed(sixnumber) || '0'}}{{fa_ket.vName}}
					</p>
					<p style="width:92%;position:relative">
						<el-slider v-model='buy_form.silder' @change='buy_slider' :step="25" show-stops>
						</el-slider>
						<span class="slider-number">{{buy_form.silder}}</span>
					</p>

					<div class="form-button"><button type="button" role="button" class="trading-redbg disabled" v-if='!$store.state.isLogin'><a href='./index#login'>{{$t(`ranking['登录/注册']`)}}</a></button></div>
					<div class="form-button"><button type="button" role="button" class="trading-redbg disabled" v-if='$store.state.isLogin' @click='buy_bizhong'>{{$t(`ranking['买入']`)}}</button></div>
				</div>
				<div class="box trading-sell" v-loading='sell_loading'>
					<h2>{{$t(`ranking['卖出']`)}}{{son_ket.vName}}</h2>
					<p class="form-assets">
						{{$t(`ranking['可用']`)}}{{son_ket.vName}}：<span aria-label="可卖：-- BTC" class="trading-greencolor hint--top">{{sell_form.money * yaochengdeshu}}</span>
						<span style="margin-left:20px"></span>{{$t('other["冻结"]')}}{{son_ket.vName}}：<span aria-label="可卖：-- BTC" class="trading-greencolor hint--top">{{sell_form.frozenTotal * yaochengdeshu}}</span>
					</p>
					<div class="form-group">
						<div class="form-control">
							<input v-model='sell_form.price' @change='check_sell_price' @keyup='check_sell_price' class="sellColor" :disabled='!$store.state.isLogin'><label>{{$t(`ranking['卖出价']`)}}{{son_ket.vName}}{{$t(`ranking['单价']`)}}({{$t(`ranking['单位']`)}}{{show_price ? 'CNY' : fa_ket.vName }})&nbsp;&nbsp;&nbsp;&nbsp; {{$t(`ranking['最小值']`)}}： {{sell_form.minSellPrize}}--
                            {{$t(`ranking['最大值']`)}}{{sell_form.maxSellPrize}}</label>
							<span style="margin-right:20px">≈<b class="sellColor">{{ !show_price ? sell_form.price / cardinal1_3 : sell_form.price * cardinal1_3 }}</b> {{!show_price ? 'CNY' : fa_ket.vName }} </span>
						</div>
					</div>

					<div class="form-group">
						<div class="form-control">
							<input @change='check_sell_number' @keyup='check_sell_number' v-model='sell_form.number' class="sellColor" :disabled='!$store.state.isLogin'>
							<label>{{$t(`ranking['卖出量']`)}}{{son_ket.vName}}{{$t(`ranking['数量']`)}}</label>
						</div>
						<div class="bk-trans-form">
						</div>
					</div>
					<p class="form-assets">{{$t(`ranking['预计交易额']`)}}：{{(sell_form.price * sell_form.number).toFixed(sixnumber) || '0'}}{{fa_ket.vName}}
						<!--                    <span class="trading-greencolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> {{fa_ket.vName}}-->
					</p>
					<p style="width:92%;position:relative">
						<el-slider v-model='sell_form.silder' @change='sell_slider' :step="25" show-stops>
						</el-slider>
						<span class="slider-number">{{sell_form.silder}}</span>
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
			<div class="disc-head" style='color:#999'><span style="font-size:16px;color:#000;margin-right:20px">{{$t(`ranking['最新价']`)}} </span><span style="font-size:16px;" :class=" tradeMarketPrize.roseFall < 0 ? 'text-second trading-greencolor': 'text-second trading-redcolor'">{{NewPrize.toFixed(sixnumber)}} {{fa_ket.vName}}</span> ≈ {{NewCount.toFixed(sixnumber)}} CNY <img :src="require('@/assets/timg.gif')" alt="" style='width:30px;float:right;margin-left:20px'></div>
			<div class="disc-head">
				<p class="stall"><span>{{$t(`ranking['档位']`)}}</span></p>
				<p><span>{{$t(`ranking['单价']`)}}({{fa_ket.vName}})</span></p>
				<p><span>{{$t(`ranking['总数量']`)}}({{son_ket.vName}})</span></p>
				<p class="last"><span>{{$t(`ranking['折价']`)}}({{fa_ket.vName}})</span></p>
			</div>
			<div class="disc-list" v-loading='buy_data_loading'>
				<div id="asksDish" class="sell-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 500ms; <!--transform: translate(0px, -952px) translateZ(0px);-->">
						<li role="button" v-for='(item,index) in buyData' @click='set_sellform(item)'>
							<p class="stall trading-greencolor" v-html="$t(`ranking['卖']`) +((buyData.length < 6) ? buyData.length : 6 - index) ">
<!--								{{$t(`ranking['卖']`)}} {{ (buyData.length < 6) ? buyData.length : 6 - index }} </p>-->
									<p class="trading-greencolor">{{item. prize.toFixed(sixnumber)}}</p>
									<p>{{item.leftAmount.toFixed(sixnumber)}}</p>
									<p class="last">{{(item.prize * item.leftAmount).toFixed(sixnumber)}}</p>
									<p class="progress" :style="{width:item.entrustType + '%'}"></p>
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
				<p><span>{{$t(`ranking['总数量']`)}}({{son_ket.vName}})</span></p>
				<p class="last"><span>{{$t(`ranking['折价']`)}}({{fa_ket.vName}})</span></p>
			</div>
			<!--            </div>-->
			<div class="disc-line"></div>
			<div class="disc-list" v-loading='sell_data_loading'>
				<div id="bidsDish" class="buy-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
						<li role="button" v-for='(item,index) in sellData' @click='set_buyform(item)'>
							<p class="stall trading-redcolor">{{$t(`ranking['买']`)}}{{index+1}}</p>
							<p class="trading-redcolor">{{item. prize.toFixed(sixnumber)}}</p>
							<p>{{item.leftAmount.toFixed(sixnumber)}}</p>
							<p class="last">{{(item.prize * item.leftAmount).toFixed(sixnumber)}}</p>
							<p class="progress" :style="{width:item.entrustType + '%'}"></p>
						</li>
					</ul>
					<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
						<div class="iScrollIndicator" style="transition-duration: 0ms; display: block; height: 20px; transform: translate(0px, 0px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="trading-record" :style='{width:width+"px",flexDirection: width > 1400 ? "row" : "column"}'>
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
								<el-table-column prop="date" :label="$t(`ranking['时间']`)" align='center' width='180'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.lastUpdateTime  | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                                  </template>
								</el-table-column>
								<el-table-column prop="name" :label="$t(`other['委托价/成交均价']`)+'('+fa_ket.vName +')'" align='center' width='190'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">
                                    	{{ scope.row.prize.toFixed(sixnumber) +'/' + scope.row.averagePrize.toFixed(sixnumber)}}
                                    </span>
                                  </template>
								</el-table-column>

								<!--
								<el-table-column prop="name" :label="$t(`ranking['成交总金额']`)+'('+fa_ket.vName +')'" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.poolCount.toFixed(sixnumber) }}</span>
                                  </template>
								</el-table-column>
-->
								<el-table-column prop="name" :label="$t(`other['总数量/未成交数']`)+'('+son_ket.vName +')'" align='cneter' width='180'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">
                                    	{{ scope.row.amount.toFixed(sixnumber) +'/' +scope.row.leftAmount .toFixed(sixnumber) }}
                                    </span>
                                  </template>
								</el-table-column>
								<!--
								<el-table-column :label="$t(`ranking['均价']`)" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.averagePrize.toFixed(sixnumber) }}</span>
                                  </template>
								</el-table-column>
-->
								<el-table-column :label="$t(`other['折算金额']`)+'('+fa_ket.vName +')'" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.poolCount && scope.row.poolCount.toFixed(sixnumber) }}</span>
                                  </template>
								</el-table-column>
								<el-table-column prop="address" label="类型" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.entrustType ? $t(`ranking['卖出']`) : $t(`ranking['买入']`) }}</span>
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
				</div>
				<div class="record-list">
					<div class="bk-norecord" style="width:100%;padding:10px;text-align:center">
						<p v-if='!$store.state.isLogin'><i class="bk-ico info"></i>{{$t(`ranking['您还没有登录']`)}}，{{$t(`ranking['请']`)}} <a href="./index#login" style="color: rgb(222, 33, 29); margin: 0px 5px;">{{$t(`ranking['登录']`)}}</a>{{$t(`ranking['或']`)}} <a href="./index#register" style="color: rgb(61, 193, 142); margin: 0px 5px;">{{$t(`ranking['注册']`)}}</a>{{$t(`ranking['后再尝试']`)}} 。</p>
						<div v-if='$store.state.isLogin'>
							<el-table :data="historyData" border v-loading='historyloading' stripe style="width: 100%">
								<el-table-column prop="date" :label="$t(`ranking['时间']`)" align='center' width='180'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.lastUpdateTime  | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                                  </template>
								</el-table-column>
								<el-table-column prop="name" :label="$t(`other['委托价/成交均价']`)+'('+fa_ket.vName +')'" align='center' width='190'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">
                                    	{{ scope.row.prize.toFixed(sixnumber) +'/' + scope.row.averagePrize.toFixed(sixnumber)}}
                                    </span>
                                  </template>
								</el-table-column>

								<!--
								<el-table-column prop="name" :label="$t(`ranking['成交总金额']`)+'('+fa_ket.vName +')'" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.poolCount.toFixed(sixnumber) }}</span>
                                  </template>
								</el-table-column>
-->
								<el-table-column prop="name" :label="$t(`other['总数量/未成交数']`)+'('+son_ket.vName +')'" align='cneter' width='180'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">
                                    	{{ scope.row.amount.toFixed(sixnumber) +'/' + scope.row.leftAmount .toFixed(sixnumber) }}
                                    </span>
                                  </template>
								</el-table-column>
								<!--
								<el-table-column :label="$t(`ranking['均价']`)" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.averagePrize.toFixed(sixnumber) }}</span>
                                  </template>
								</el-table-column>
-->
								<el-table-column :label="$t(`other['折算金额']`)+'('+fa_ket.vName +')'" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.poolCount && scope.row.poolCount.toFixed(sixnumber) }}</span>
                                  </template>
								</el-table-column>
								<el-table-column prop="address" :label="$t(`other['类型']`)" align='center'>
									<template slot-scope="scope">
                                    <span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{ scope.row.entrustType ? $t(`ranking['卖出']`) : $t(`ranking['买入']`) }}</span>
                                  </template>
								</el-table-column>
							</el-table>
							<div class="pagination">
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
				<el-table :data="newData" fit highlight-current-row style="width: 100%;margin-top:20px" v-loading='new_loading'>
					<el-table-column align="center" :label="$t(`ranking['时间']`)" width='180'>
						<template slot-scope="scope">
							<span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t(`ranking['均价']`) +fa_ket.vName">
						<template slot-scope="scope">
							<span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{scope.row.averagePrize.toFixed(sixnumber)}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t(`ranking['折价']`) + fa_ket.vName">
						<template slot-scope="scope">
							<span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{(scope.row.prize * scope.row.amount).toFixed(sixnumber)}}</span>
						</template>
					</el-table-column>
					<el-table-column align="center" :label="$t(`ranking['交易量']`) + son_ket.vName">
						<template slot-scope="scope">
							<span :style="{color: scope.row.entrustType ? '#30c296':'#fd315b'}">{{scope.row.amount.toFixed(sixnumber)}}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="newest-top">{{$t('other["币种介绍"]')}}</div>
			<div class="newest-top" style="line-height:1.5;text-indent:2em">{{son_ket.kidsDescription}}</div>
		</div>
	</div>
</div>
</div>
</template>
<script>
	import kline_api from '@/config'
	import Get from '@/api/get'
	import Post from '@/api/post'
	export default {
		name: 'transaction',
		data() {
			return {
				son_img: '',
				yaochengdeshu: 1,
				cardinal1_3: 1,
				show_price: false,
				new_loading: false,
				son_value: '',
				sell_data_loading: false,
				buy_data_loading: false,
				buy_loading: false,
				sell_loading: false,
				vName: '',
				NewAmount: 0,
				NewCount: 0,
				NewPrize: 0,
				shortName: '',
				newPrice: {
					follow: '0',
					master: '0'
				},
				currentPage4: 1,
				total: 10,
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
				sixnumber: 6, //限制最小保留次数
				width: null,
				current: true,
				polar: {},
				father_market: [],
				son_market: [],
				current_market: [],
				son_ket: {
					bId: '',
					vName: '',
				},
				fa_ket: {
					bId: '',
					vName: '',
					description: ''
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
				kline: null,
				myArr: [],
			}
		},
		created() {
			var local = localStorage.getItem('mytrade');
			this.myArr = JSON.parse(local) || [];
			var home_data = window.location.search;
			if (home_data) {
				this.vName = home_data.slice(1).split('_')[1];
				this.shortName = home_data.slice(1).split('_')[0];
			}
			this.width = window.outerWidth - 410;
			Get({
				url: 'basisMarket/selBasisMarket',
				success: res => {
					if (res.code === 0) {
						this.father_market = res.data;
						for (var i = 0; i < res.data.length; i++) {
							if (res.data[i].vName === this.vName) {
								this.father_current = i;
							}
						}
						this.fa_ket = res.data[this.father_current];
						this.selcurrencyManage(this.fa_ket);
					}
				}
			})

		},
		methods: {
			shuruzhuanhuan(e) {
				if (e) {
					this.yaochengdeshu = this.cardinal1_3;
				} else {
					this.yaochengdeshu = 1;
				}
			}, //输入转换
			change_son_value(e) {
				var res = e.target.value;
				if (res) {
					res = res.toUpperCase()
					var newArr = [];
					for (var i = 0; i < this.current_market.length; i++) {
						if (this.current_market[i].vName.includes(res)) {
							newArr.push(this.current_market[i]);
						}
					}
					this.son_market = JSON.parse(JSON.stringify(newArr));
				} else {
					this.son_market = JSON.parse(JSON.stringify(this.current_market));
				}
			},
			showstart(index) {
				return this.son_market[index].show
			},
			add_my(item, index) {
				var arr = JSON.parse(JSON.stringify(this.son_market));
				if (this.father_current === 100) {
					this.myArr.splice(index, 1);
					this.son_market.splice(index, 1);
					localStorage.setItem('mytrade', JSON.stringify(this.myArr));
					return
				}
				if (this.son_market[index].show) {
					this.myArr = this.myArr.filter(res => {
						return res.vName !== item.vName
					})
					localStorage.setItem('mytrade', JSON.stringify(this.myArr));
					arr[index].show = false;
					this.son_market = arr;
				} else {
					item.show = true;
					this.myArr.push(item);
					localStorage.setItem('mytrade', JSON.stringify(this.myArr));
					arr[index].show = true;
					this.son_market = arr;
				}
			},
			set_buyform(item) {
				this.sell_form.price = item.prize.toFixed(this.sixnumber);
				this.sell_form.number = item.leftAmount.toFixed(this.sixnumber);
			},
			set_sellform(item) {
				this.buy_form.price = item.prize.toFixed(this.sixnumber);
				this.buy_form.number = item.leftAmount.toFixed(this.sixnumber);
			},
			handleCurrentChange() {

			},
			/*根据交易市场查询最新数据*/
			get_nvz_api(tradeMarket) {
				if (this.son_ket.vName === '' || this.fa_ket.vName === '') {
					return
				}
				Get({
					url: 'pool/selNewClinchADealNew',
					data: {
						tradeMarket: tradeMarket,
					},
					success: res => {
						if (res.code === 0) {
							this.new_loading = false;
							this.sell_data_loading = false;
							this.buy_data_loading = false;
							this.newData = res.data.history.splice(0, 10);
							this.sellData = res.data.buy.reverse();
							this.buyData = res.data.sell;
							this.NewPrize = res.data.NewPrize;
							this.NewAmount = res.data.NewAmount;
							this.NewCount = res.data.NewCount;
						} else {

						}
					}
				})
			},
			/*获取深度图数据*/
			get_deep_data(tradeMarket) {
				if (this.son_ket.vName === '' || this.fa_ket.vName === '') {
					return
				};

				Get({
					url: 'virtualWallet/selTdepth',
					data: {
						tradeMarket: tradeMarket,
					},
					success: res => {
						if (res.code === 0) {
							if (res.data.asks === '') {
								return
							} else {
								res.data.bids === ''
							};
							var asks = JSON.parse(res.data.asks);
							var bids = JSON.parse(res.data.bids);
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
									name: '卖单',
									type: 'line',
									smooth: true,
									showSymbol: false,
									sampling: 'average',
									itemStyle: {
										normal: {
											color: '#64D694'
										}
									},
									lineStyle: {
										color: '#64D694',
										width: 3
									},
									areaStyle: {},
									data: asks.map(function(e) {
										return [e[0], e[1]]
									})
								}, {
									name: '买单',
									type: 'line',
									smooth: true,
									showSymbol: false,
									sampling: 'average',
									itemStyle: {
										normal: {
											color: '#E65855'
										},

									},
									lineStyle: {
										color: '#E65855',
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
									data: bids.map(function(e) {
										return [e[0], e[1]]
									})
								}]
							};
						} else {

						}
					}
				})
			},
			cancael(id) {
				this.$confirm('确定撤销该委托?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
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
									duration: 3000
								});
								this.selPool(this.son_ket.vName + '_' + this.fa_ket.vName);
								this.get_nvz_api(this.son_ket.vName + '_' + this.fa_ket.vName);
							} else {
								this.$message({
									message: '撤销失败',
									type: 'error',
									duration: 2000
								});
							}
						},
						fail: res => {
							this.loading = false;
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			buy_slider(e) {
				this.buy_form.silder = e;
				this.buy_form.number = (this.buy_form.money * e / 100).toFixed(this.sixnumber);
			},
			sell_slider(e) {
				this.sell_form.number = (this.sell_form.money * e / 100).toFixed(this.sixnumber);
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
				this.$confirm('确定买入' + this.son_ket.vName + '单价' + this.buy_form.price + '，' + this.son_ket.vName + '数量' + this.buy_form.number + '，预计交易额' + (this.buy_form.price * this.buy_form.number).toFixed(this.sixnumber) + this.fa_ket.vName + '吗', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true;
					var price = '';
					if (this.show_price) {
						price = this.buy_form.price * this.cardinal1_3
					} else {
						price = this.buy_form.price;
					}
					Post({
						url: 'pool/addBuyPool',
						data: {
							tradeMarket: this.son_ket.vName + '_' + this.fa_ket.vName,
							entrustType: 0,
							prize: price,
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
								this.buy_form.price = '';
								this.buy_form.number = '';
								this.findUser(this.son_ket);
								this.selPool(this.son_ket.vName + '_' + this.fa_ket.vName);
								this.get_nvz_api(this.son_ket.vName + '_' + this.fa_ket.vName);
							} else {
								this.$message({
									message: res.data,
									type: 'error',
									duration: 5000
								});
							}
						}
					})
				}).catch((res) => {
					this.$message({
						type: 'info',
						message: '已取消卖入'
					});
				});

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
				this.$confirm('确定卖出' + this.son_ket.vName + '单价' + this.sell_form.price + '，' + this.son_ket.vName + '数量' + this.sell_form.number + '，预计交易额' + (this.sell_form.price * this.sell_form.number).toFixed(this.sixnumber) + this.fa_ket.vName + '吗', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true;
					var price = '';
					if (this.show_price) {
						price = this.sell_form.price * this.cardinal1_3
					} else {
						price = this.sell_form.price;
					}
					Post({
						url: 'pool/addSellPool',
						data: {
							tradeMarket: this.son_ket.vName + '_' + this.fa_ket.vName,
							entrustType: 0,
							prize: price,
							amount: this.sell_form.number,
							currId: this.son_ket.vId,
							basisId: this.fa_ket.bId,
						},
						success: res => {
							this.loading = false;
							if (res.code === 0) {
								this.$message({
									message: '卖出成功',
									type: 'success',
									during: 5000
								});
								this.findUser(this.son_ket);
								this.sell_form.price = '';
								this.sell_form.number = '';
								this.selPool(this.son_ket.vName + '_' + this.fa_ket.vName);
								this.get_nvz_api(this.son_ket.vName + '_' + this.fa_ket.vName);
							} else {
								this.$message({
									message: res.data,
									type: 'error',
								});
							}
						}
					})
				}).catch((res) => {
					this.$message({
						type: 'info',
						message: '已取消卖出'
					});
				});

			},
			check_buy_price() {
				var v = this.buy_form.price;
				var reg = /^([1-9]\d*|0)(\.)?(\d*)$/;
				if (!reg.test(v)) {
					this.buy_form.price = '';
					return
				}
				var max = this.buy_form.maxBuyPrize;
				var min = this.buy_form.minBuyPrize;
				var number = this.sixnumber;

				if (v > max) {
					this.buy_form.price = max;
					this.$message({
						message: '请输入' + min + '-' + max + '以内的价格',
						type: 'error'
					});
					return
				};
				if (v < min) {
					this.buy_form.price = min;
					this.$message({
						message: '请输入' + min + '-' + max + '以内的价格',
						type: 'error'
					});
					return
				}
				if (v - 0) {
					var str = v + '';
					if (str.includes('.')) {
						var strarr = str.split('.')[1];
						if (strarr.length > number) {
							this.buy_form.price = (v - 0).toFixed(number);
						}
					}
				}
			},
			check_buy_number(e) {
				var v = this.buy_form.number;
				var reg = /^([1-9]\d*|0)(\.)?(\d*)$/;
				if (!reg.test(v)) {
					this.buy_form.number = '';
					return
				}
				var max = this.buy_form.maxBuyPrize;
				var min = this.buy_form.minBuyPrize;
				var number = this.sixnumber;
				if ((v - 0) < 0) {
					this.buy_form.number = 0;
					return
				}

				if (v - 0) {
					if (v.split('.')[1] !== undefined) {
						if ((v.split('.')[1] + '').length > number) {
							var x = (v - 0).toFixed(number);
							this.buy_form.number = x;
						}
					}
				}
				//				if (v - 0) {
				//					var x = (v - 0).toFixed(number) ;
				//					this.buy_form.number = x;
				//				}
				if (v * this.buy_form.price > this.buy_form.money) {
					this.$message({
						message: '可用余额不足',
						type: 'error'
					});
					this.buy_form.number = (this.buy_form.money / this.buy_form.price).toFixed(number)
					return
				}
			},
			check_sell_number() {
				var v = this.sell_form.number;
				var reg = /^([1-9]\d*|0)(\.)?(\d*)$/;
				if (!reg.test(v)) {
					this.sell_form.number = '';
					return
				}
				var max = this.sell_form.maxBuyPrize;
				var min = this.sell_form.minBuyPrize;
				var number = this.sixnumber;
				if ((v - 0) < 0) {
					this.sell_form.number = 0;
					return
				}
				if (v - 0) {
					if (v.split('.')[1] !== undefined) {
						if ((v.split('.')[1] + '').length > number) {
							var x = (v - 0).toFixed(number);
							this.sell_form.number = x;
						}
					}
				}
				if (v > this.sell_form.money) {
					this.$message({
						message: '可用数量不足',
						type: 'error'
					});
					this.sell_form.number = (this.sell_form.money / this.sell_form.price).toFixed(number)
					return
				}
			},
			check_sell_price() {
				var v = this.sell_form.price;
				var reg = /^([1-9]\d*|0)(\.)?(\d*)$/;
				if (!reg.test(v)) {
					this.sell_form.price = '';
					return
				}
				var max = this.sell_form.maxSellPrize;
				var min = this.sell_form.minSellPrize;
				var number = this.sixnumber;

				if (v > max) {
					this.sell_form.price = max;
					this.$message({
						message: '请输入' + min + '-' + max + '以内的价格',
						type: 'error'
					});
					return
				}
				if (v < min) {
					this.sell_form.price = min;
					this.$message({
						message: '请输入' + min + '-' + max + '以内的价格',
						type: 'error'
					});
					return
				}
				if (v - 0) {
					var str = v + '';
					if (str.includes('.')) {
						var strarr = str.split('.')[1];
						if (strarr.length > number) {
							this.sell_form.price = (v - 0).toFixed(number);
						}
					}
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
				if (item === '我的') {
					this.father_current = 100;
					return this.son_market = JSON.parse(JSON.stringify(this.myArr))
				};
				this.father_current = index;
				this.son_current = 0;
				this.fa_ket = item;
				this.selcurrencyManage(item);
			},
			/*切换子市场*/
			check_son(raw, a, column) {

				if (!column.label) {
					return
				}
				this.son_img = raw.markUrl;
				this.cardinal1_3 = raw.cardinal1_3 || 1;
				this.new_loading = true;
				this.sell_data_loading = true;
				this.buy_data_loading = true;
				this.kline.setSymbol(raw.vName, 'USD/BTC');
				this.son_ket = Object.assign({}, raw);
				this.son_ket.vName = this.son_ket.vName.split('_')[0]
				this.findprize(raw);
				this.findNewPrice(raw);
				this.findNewPriceBuVirtual(raw);
				this.findUser(raw);
				this.selPool(raw);
				this.selCurrencyTraedSum(raw);
				this.get_deep_data(raw.vName)
				this.get_nvz_api(raw.vName)
				//                this.selAmountMoney(raw)
			},
			/*根据币种id查询当前用户钱包:*/
			findUser(item) {
				this.buy_loading = true;
				this.sell_loading = true;
				Get({
					url: 'pool/findUserVirtualCoinNum',
					data: {
						id: item.vId
					},
					success: res => {
						this.buy_loading = false;
						if (res.code === 0) {
							this.sell_form.money = res.data.vTotal;
							this.sell_form.frozenTotal = res.data.frozenTotal;
						}
					},
					fail: res => {
						this.buy_loading = false;
					}
				})
				Get({
					url: 'pool/findUserVirtualCoinNum',
					data: {
						id: this.fa_ket.vId
					},
					success: res => {
						this.sell_loading = false;
						if (res.code === 0) {
							this.buy_form.money = res.data.vTotal;
							this.buy_form.frozenTotal = res.data.frozenTotal;
						}
					},
					fail: res => {
						this.sell_loading = false;
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
							for (var i = 0; i < res.data.length; i++) {
								res.data[i].show = false;
								for (var k = 0; k < this.myArr.length; k++) {
									if (this.myArr[k].vName === res.data[i].vName) {
										res.data[i].show = true;
									}
								}
								if (res.data[i].vName.split('_')[0] === this.shortName) {
									this.son_current = i;
									this.shortName = '';
								}
							}
							this.new_loading = true;
							this.sell_data_loading = true;
							this.buy_data_loading = true;
							var index = this.son_current;
							this.son_market = res.data;
							this.current_market = res.data;
							this.son_ket = JSON.parse(JSON.stringify(res.data[index]));
							this.cardinal1_3 = res.data[index].cardinal1_3 / res.data[index].latestPrize || 1;
							this.son_ket.vName = this.son_ket.vName.split('_')[0];
							this.son_img = res.data[index].markUrl;
							this.get_deep_data(res.data[index].vName);
							this.get_nvz_api(res.data[index].vName);
							this.findprize(res.data[index]);
							this.findNewPrice(res.data[index]);
							this.findNewPriceBuVirtual(res.data[index]);
							this.findUser(res.data[index]);
							this.selCurrencyTraedSum(res.data[index]);
							this.selPool(res.data[index])
							this.kline.setSymbol(res.data[index].vName, 'USD/BTC');
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
			setInterval(res => {
				Get({
					url: 'pool/findDealState',
					success: res => {
						if (res.code === 0) {
							if (res.data === 1) {
								this.get_nvz_api(this.son_ket.vName + '_' + this.fa_ket.vName);
							}
						}
					}
				})
			}, 1000);
			setInterval(res => {
				this.get_deep_data(this.son_ket.vName + '_' + this.fa_ket.vName);
				this.get_nvz_api(this.son_ket.vName + '_' + this.fa_ket.vName);
			}, 5000)
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
	.slider-number {
		position: absolute;
		top: 12px;
		right: -20px;
		font-size: 16px;
	}

	.section {
		display: flex;
		width: 100%;
	}

	.trading-count,
	.trading-chart,
	.trading-hotspot,
	.trading-record {
		overflow: hidden;
	}

	.el-slider__runway {
		/*		position: relative;*/
		/*		width: 94%;*/
	}

	.el-slider__runway:before {
		content: '%';
		position: absolute;
		top: -5px;
		right: -40px;
		font-size: 20px;
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
