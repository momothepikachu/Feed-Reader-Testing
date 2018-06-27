/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* $() function ensures these tests don't run until the DOM is ready
 */
$(function() {
    /* This suite is all about the RSS feeds definitions, the allFeeds variable in our application.*/
    describe('RSS Feeds', function() {
        /* these tests make sure that the allFeeds variable has been defined and that it is not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);          
        });

        it('each feed has a URL and that the URL is not empty', function(){
        //Loops through allFeeds to ensure each URL is defined and that the URL is not empty.
            for(let i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }            
        });

        it('each feed has a name and that the name is not empty', function(){
        //Loops through allFeeds to ensure all names are defined and not empty.
            for(let i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }          
        });         
    });

    describe('The menu', function() {
        let body = document.querySelector('body');

        /* Test if the menu element is hidden by default. */
         it('is hidden by default', function(){
            expect(body.classList.contains('menu-hidden')).toBe(true);
         });

         /* Test if the menu changes visibility when the menu icon is clicked. */
        it('displays when the menu icon is clicked and hides when clicked again', function() {
            document.querySelector('.menu-icon-link').click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            document.querySelector('.menu-icon-link').click();   
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function(){

        /* Ensure if the loadFeed function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it('have at least one entry wihtin the feed container', function(done){
            expect(document.querySelectorAll('.feed .entry').length>=1).toBe(true);
            done();
        });
    });

    describe('New Feed Selection', function(){
        /* Ensure when a new feed is loaded by the loadFeed function that the content actually changes. */
        let firstFeed;
        let secondFeed;

        beforeEach(function(done){
            loadFeed(0, function(){
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, function(){
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                })
            });
        });        
        it('is different than the initial entries', function(done){
            expect(firstFeed).not.toEqual(secondFeed);
            done();
        })           
    });

}());
