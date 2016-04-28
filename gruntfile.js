module.exports = function(grunt){
    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/javascripts/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jsint'],
                options: {
                    livereload: true
                }
            }
        },
        
        nodemon: {
            dev:{
                options:{
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['app', 'config'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });
    
    // 只要有文件的变动就重启服务
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 实时监听入口文件
    grunt.loadNpmTasks('grunt-nodemon');
    //对慢任务开发的插件   sass 就是慢任务
    grunt.loadNpmTasks('grunt-concurrent');    
    
    grunt.option('force', true);
    grunt.registerTask('default', ['concurrent']);
}