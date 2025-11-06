// Extract YouTube video IDs and titles from channel page
// Copy and paste this ENTIRE code block into the browser console on the YouTube channel page
// Make sure you've scrolled to load all videos first!

const videos = [];
const videoElements = document.querySelectorAll('a[href*="/watch?v="]');

console.log(`Found ${videoElements.length} video links`);

videoElements.forEach(link => {
    const href = link.getAttribute('href');
    const match = href.match(/\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (match) {
        const videoId = match[1];
        
        // Skip if we already have this video
        if (videos.find(v => v.id === videoId)) return;
        
        // Try to get title - start with simplest methods
        let title = '';
        
        // Method 1: aria-label (often has full title)
        const ariaLabel = link.getAttribute('aria-label');
        if (ariaLabel && ariaLabel.length > 5) {
            title = ariaLabel;
            // Remove "by ChannelName" suffix if present
            if (title.includes(' by ')) {
                title = title.split(' by ')[0].trim();
            }
        }
        
        // Method 2: title attribute
        if (!title || title.length < 3) {
            const titleAttr = link.getAttribute('title');
            if (titleAttr && titleAttr.length > 3) {
                title = titleAttr;
            }
        }
        
        // Method 3: Look for parent container with video title
        if (!title || title.length < 3) {
            // Try to find the video container
            let container = link;
            for (let i = 0; i < 5; i++) {
                container = container.parentElement;
                if (!container) break;
                
                // Look for video title in this container
                const titleEl = container.querySelector('#video-title, [id*="title"]');
                if (titleEl && titleEl.textContent) {
                    const text = titleEl.textContent.trim();
                    if (text.length > 3) {
                        title = text;
                        break;
                    }
                }
            }
        }
        
        // Clean up title
        if (title) {
            // Remove duration patterns (e.g., "23:45", "1:23:45")
            title = title.replace(/\d{1,2}:\d{2}(:\d{2})?/g, '').trim();
            // Remove "En cours de lecture" or similar
            title = title.replace(/En cours de lecture/gi, '').trim();
            // Remove "Regarder" or "Watch"
            title = title.replace(/^(Regarder|Watch)\s*/i, '').trim();
            // Clean up extra whitespace
            title = title.replace(/\s+/g, ' ').trim();
        }
        
        videos.push({
            id: videoId,
            title: title || 'Untitled',
            url: 'https://www.youtube.com/watch?v=' + videoId
        });
    }
});

console.log(`\n✅ Found ${videos.length} videos:`);
console.table(videos);

// Count how many have titles vs untitled
const withTitles = videos.filter(v => v.title !== 'Untitled').length;
const untitled = videos.filter(v => v.title === 'Untitled').length;
console.log(`\n📊 Summary: ${withTitles} with titles, ${untitled} untitled`);

// Generate JSON output
const jsonOutput = JSON.stringify(videos, null, 2);
console.log('\n=== JSON OUTPUT (copy this) ===');
console.log(jsonOutput);

// Try to copy to clipboard
if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(jsonOutput).then(function() {
        console.log('\n✅ JSON copied to clipboard!');
    }).catch(function(err) {
        console.log('\n⚠️ Could not copy to clipboard');
    });
}

videos;
