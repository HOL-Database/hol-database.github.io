import { QuartzTransformerPlugin } from "../types";

export const LocalCustomTransformer: QuartzTransformerPlugin = () => {
  return {
    name: "LocalCustomTransformer",
    
    textTransform(_ctx, src) {
      src = src.replaceAll(/(```timeline(?:(?!\n```)[\s\S])*\n```)/g, 'timeline-start-tag\n$1\ntimeline-end-tag');
      let srcs: string[] = src.split(/timeline-start-tag|timeline-end-tag/g);

      srcs = srcs.map(string => {
        if (!string.match(/(```timeline(?:(?!\n```)[\s\S])*\n```)/g)) {
          return string;
        }

        string = string.replaceAll(/\[\[((?:(?!\]\])(?!\[\[).)*)\]\]/g, '<a href="./$1" class="internal internal-link alias" data-slug="the-protected-age">$1</a>');
        string = string.replaceAll(/\*\*([^*]*)\*\*/g, '<strong>$1</strong>');
        string = string.replaceAll(/\*([^*]*)\*/g, '<em>$1</em>');

        let timelineItems = string.split('\n');

        timelineItems = timelineItems.filter(str => str.match(/^\+ /)).map(str => str.slice(2));

        const elementWrappers = [
          ['<div class="time"><p dir="auto">', '</p></div>'],
          ['<div class="title"><p dir="auto">', '</p></div>'],
          ['<div class="description"><p dir="auto">', '</p></div>'],
        ];

        timelineItems = timelineItems.map((item, index) => {
          if (index % 3 === 2) {
            item = item.replaceAll(/<br[^>]*>/g, '</p><p dir="auto">');
          }
          return elementWrappers[index%3][0] + item + elementWrappers[index%3][1];
        });

        return `<div class="timeline">\n${timelineItems.join('')}\n</div>`;
      });

      src = srcs.join('');

      return src;
    },
  }
}