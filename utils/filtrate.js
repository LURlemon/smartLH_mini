const tabTxt = [
  {
    'text': '需求信息',
    'active': false,
    'id': 0,
    'child': [{

    }]
  },
  {
    'text': '条件筛选',
    'active': false,
    'id': 1,
    'child': [{
      'id': 1,
      'title': '学历',
      'childType': [

        {
          'id': 1,
          'text': '不限',
          'selected': false,
        },
        {
          'id': 2,
          'text': '高中',
          'selected': false,
        },
        {
          'id': 3,
          'text': '专科',
          'selected': false,
        },
        {
          'id': 4,
          'text': '本科',
          'selected': false,
        },
        {
          'id': 5,
          'text': '硕士',
          'selected': false,
        },
        {
          'id': 6,
          'text': '博士',
          'selected': false,
        }

      ],
      'type': 0
    },
    {
      'id': 2,
      'title': '年龄',
      'childType': [{
        'id': 1,
        'text': '25岁以下',
        'selected': false,
      },
      {
        'id': 2,
        'text': '30岁以下',
        'selected': false,
      },
      {
        'id': 3,
        'text': '35岁以下',
        'selected': false,
      },
      {
        'id': 4,
        'text': '40岁以下',
        'selected': false,
      },
      {
        'id': 5,
        'text': '45岁以下',
        'selected': false,
      },
      {
        'id': 6,
        'text': '50岁以下',
        'selected': false,
      },
      {
        'id': 7,
        'text': '55岁以下',
        'selected': false,
      },
      ],
      'type': 0
    },
    {
      'id': 3,
      'title': '薪资',
      'childType': [{
        'id': 1,
        'text': '1k-2k/月',
        'selected': false,
      },
      {
        'id': 2,
        'text': '2k-3k/月',
        'selected': false,
      },
      {
        'id': 3,
        'text': '3k-4k/月',
        'selected': false,
      },
      {
        'id': 4,
        'text': '4k-6k/月',
        'selected': false,
      },
      {
        'id': 5,
        'text': '6k-8k/月',
        'selected': false,
      },
      {
        'id': 6,
        'text': '8k-10k/月',
        'selected': false,
      },
      {
        'id': 7,
        'text': '10k以上/月',
        'selected': false,
      },
      ],
      'type': 0
    },
    {
      'id': 4,
      'title': '工作经验',
      'childType': [{
        'id': 1,
        'text': '1年以上',
        'selected': false,
      },
      {
        'id': 2,
        'text': '2年以上',
        'selected': false,
      },
      {
        'id': 3,
        'text': '5年以上',
        'selected': false,
      },
      {
        'id': 4,
        'text': '8年以上',
        'selected': false,
      },
      {
        'id': 5,
        'text': '10年以上',
        'selected': false,
      },
      {
        'id': 6,
        'text': '不限',
        'selected': false,
      },
      ],
      'type': 0
    },
    ]
  }
]

module.exports = {
  tabTxt: tabTxt
}