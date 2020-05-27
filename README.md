# Blender Media

[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![Build Status](https://img.shields.io/travis/spatie-custom/blender-content-blocks.svg?style=flat-square)](https://travis-ci.org/spatie-custom/blender-content-blocks)

Content blocks component for [Blender](https://github.com/spatie-custom/blender), our CMS.

## Support us

Learn how to create a package like this one, by watching our premium video course:

[![Laravel Package training](https://spatie.be/github/package-training.jpg)](https://laravelpackage.training)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Installation

The `blender-content-blocks` can be installed from npm.

```bash
yarn add @spatie/blender-content-blocks
```

`blender-content-blocks` also requires you to install `vue@'^2.0.0'`, `lodash@'^4.0.0'`, and `spatie-dom@'^1.0.0'`:

```bash
yarn add vue@'^2.0.0' lodash@'^4.0.0' spatie-dom@'^1.0.0'
```

## Usage

The canonical way to use `blender-content-blocks`, is to mount it on a selector. The `mount` function will replace every element that matches a given selector with a `blender-content-blocks` component. The element should contain props just like you'd pass them with Vue.

```js
import { mount } from '@spatie/blender-content-blocks';

export default function init() {
    mount('content-blocks');
}
```

```html
<content-blocks
    collection="default"
    editor="default"
    create-url="/create"
    :model="{ name: 'MyModel', id: 1 }"
    :input="[]"
    :data="{
        locales: ['nl', 'en'],
        contentLocale: 'nl',
        mediaModel: 'App\Models\ContentBlock',
        mediaUploadUrl: '/upload'
    }"
    :debug="false"
></content-blocks>
```

### Custom Fields

Custom fields can be defined by passing `types`, `translatableAttributes` or `mediaLibraryCollections` to `data`. Here are the default values as a quick reference:

```js
{
    types: {
        imageLeft: 'Afbeelding links',
        imageRight: 'Afbeelding rechts',
    },
    translatableAttributes: {
        name: 'text',
        text: 'redactor',
    },
    mediaLibraryCollections: {
        image: 'image',
    },
}
```

## Contributing

Since this is an internal project, we don't accept pull requests at this time.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

Example images provided by [Unsplash](https://unsplash.com).
