// 本身使用node.js module导出的方式
module.exports = {
    entry: {
        main: './main.js'
    },
    mode: 'development',
    module: {
        // modules中配置规则
        rules: [
            {
               test: /\.js$/,
               use: {
                   loader: 'babel-loader',  // 添加options 来定义解析的语法
                   options: {
                       presets: ['@babel/preset-env'],
                       plugins: [ ['@babel/plugin-transform-react-jsx',{ pragma: 'createElement' }] ]
                   }
               } 
            }
        ]
    },
    optimization: {
        minimize: false
    }
}